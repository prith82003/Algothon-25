import { config } from "dotenv";
config();

import { Queue, Worker } from "bullmq";

import {
  S3Client,
  HeadObjectCommand,
  NotFound as S3NotFound,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 } from "uuid";
import StreamZip from "node-stream-zip";
import { exec } from "child_process";
import { join } from "path";
import fs from "fs";
import { Readable } from "stream";
import { mkdirSync } from "fs";
import * as submissionRepo from "../repository/submission.repository";
import * as markingRepo from "../repository/marking.repository";

export const markingQueue = new Queue<{
  groupName: string;
}>("Mark", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

export const worker = new Worker<{
  groupName: string;
}>(
  "Mark",
  async (job) => {
    const data = job.data;
    console.log("now marking", data);
    const submission = await submissionRepo.getLastSubmissionForGroup(
      data.groupName
    );

    if (
      !submission ||
      !submission.submission.fileKey ||
      (submission.marking && submission.marking.score !== null)
    ) {
      return;
    }

    if (!submission.submission.readyToMark) {
      console.log("Submission not ready to mark");
      throw new Error(
        `Submission ${submission.submission.id} not ready to mark yet...`
      );
    }

    const fileExists = await checkS3FileExists(submission.submission.fileKey);

    if (!fileExists) {
      console.log("No such key");
      throw new Error("No such key");
    }

    const uniqueId = v4();

    const savePath = join("tmp", "marking", uniqueId);
    const savedFilePath = await downloadS3File(
      submission.submission.fileKey,
      savePath
    );
    const extractedPath = await unZipSubmission(savedFilePath, savePath);
    const evalFilePath = join(extractedPath, "eval.py");
    insertEvalScript(evalFilePath);
    insertPricesTxt(join(extractedPath, "prices.txt"));
    insertDockerfile(join(extractedPath, "Dockerfile"));
    try {
      const markingOutput = await dockerizeAndMark(extractedPath);
      const score = Number(markingOutput.trim());
      console.log({ score });
      await markingRepo.markSubmission(submission.submission.id, score);
      console.log(
        `Successfully marked submission ${submission.submission.id} for group ${data.groupName}`
      );
    } catch (err) {
      console.error("Could not mark", err);
      if (err instanceof Error) {
        const errorMessage = err.message.slice(-500);

        await submissionRepo.setSubmissionMarkingOutput(
          submission.submission.id,
          err.message.length > 500 ? "..." + errorMessage : errorMessage
        );
      }
      throw err;
    } finally {
      try {
        fs.rmSync(savePath, { recursive: true, force: true });
      } catch (err) {
        console.error(err);
      }
    }
  },
  {
    concurrency: 2,
  }
);

const dockerizeAndMark = (cwd: string) => {
  const key = v4();
  return runCommand(`docker build . --force-rm -q -t ${key}`, cwd)
    .then(() =>
      runCommand(
        `docker run --read-only --tmpfs "/tmp" --rm --network none -m 100m --cpus=".4" ${key}`,
        cwd
      ).finally(() => runCommand(`docker image rm ${key}`, cwd))
    )
    .catch((err) => {
      console.error("Docker image failed", key, err);
      throw err;
    })
    .finally(() => runCommand(`docker image prune -f`, cwd));
};

const insertDockerfile = (destinationPath: string) => {
  console.log("Inserting docker file");
  fs.copyFileSync("./scripts/Dockerfile", destinationPath);
  console.log("Docker file inserted");
};

const insertPricesTxt = (destinationPath: string) => {
  console.log("Inserting prices");
  fs.copyFileSync("./scripts/prices.txt", destinationPath);
  console.log("Prices inserted");
};

const insertEvalScript = (destinationPath: string) => {
  console.log("Inserting eval script");
  fs.copyFileSync("./scripts/eval.py", destinationPath);
  console.log("Python script inserted");
};

const unZipSubmission = async (filePath: string, extractPath: string) => {
  console.log("Unzipping submission", filePath, "to", extractPath);
  try {
    const zip = new StreamZip.async({ file: filePath });
    const extractionPath = join(extractPath, "extracted");
    fs.mkdirSync(extractionPath, { recursive: true });
    const count = await zip.extract(null, extractionPath);
    await zip.close();
    return extractionPath;
  } catch (err) {
    throw err;
  }
};

const downloadS3File = (key: string, savePath: string): Promise<string> => {
  console.log("Downloading s3 file", key, "to", savePath);
  return new Promise(async (resolve, reject) => {
    mkdirSync(savePath, { recursive: true });
    const submissionFile = await client.send(
      new GetObjectCommand({
        Bucket: "fintech-algo-2024",
        Key: key,
      })
    );
    const savedPath = join(savePath, "/submission.zip");
    const write = fs.createWriteStream(savedPath);
    (submissionFile.Body as Readable).pipe(write);
    write.on("finish", () => {
      resolve(savedPath);
    });
  });
};

const checkS3FileExists = async (key: string) => {
  console.log("Checking s3 file exists", key);
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: "fintech-algo-2024",
        Key: key,
      })
    );
    return true;
  } catch (err) {
    return false;
  }
};

const runCommand = (command: string, cwd: string): Promise<string> => {
  console.log("Running command", command, cwd);
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        cwd,
      },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      }
    );
  });
};
