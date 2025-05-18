import {
  S3Client,
  HeadObjectCommand,
  NotFound as S3NotFound,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import * as submissionRepo from "../repository/submission.repository";
import { DiscordUser, TeamDetails } from "../types/discord";
import { markingQueue } from "../queues/queue";
import Unauthorized from "../errors/Unauthorized";
import { SubmissionReport, SubmissionStatus } from "../types/submission";

const client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

export const createUploadLink = async (
  discordUser: DiscordUser,
  teamDetails: TeamDetails
): Promise<{
  url: string;
  key: string;
  fields: Record<string, string>;
}> => {
  try {
    const fileName = teamDetails.isIndividual
      ? "individual"
      : `${teamDetails.groupName}/${teamDetails.groupRoleId}`;

    const fileKey = `submission/${fileName}/${new Date().toISOString()}-${
      discordUser.id
    }`;

    const name = teamDetails.isIndividual
      ? discordUser.username
      : teamDetails.groupName;

    await submissionRepo.createSubmission({
      fileKey: fileKey,
      groupName: name,
      isIndividual: teamDetails.isIndividual,
      submittedBy: discordUser.id,
    });

    const { url, fields } = await createPresignedPost(client, {
      Bucket: "fintech-algo-2024",
      Key: fileKey,
      Conditions: [
        { bucket: "fintech-algo-2024" },
        ["content-length-range", 1, 10000000], //10MB
        ["starts-with", "$Content-Type", "application/"],
      ],
    });

    if (name) {
      await markingQueue.add(
        "marking",
        {
          groupName: name,
        },
        {
          delay: 1000 * 60,
          removeOnComplete: true,
        }
      );
    }

    return { url, key: fileKey, fields };
  } catch (err) {
    console.error("Error getting presigned post URL", err);
    throw err;
  }
};

export const markSubmissionReady = async (
  submissionKey: string
): Promise<void> => {
  try {
    await submissionRepo.markSubmissionReady(submissionKey);
    return;
  } catch (err) {
    console.error("Error marking submission as ready", submissionKey, err);
    throw err;
  }
};

export const getLastSubmissionForGroup = async (
  groupName: string
): Promise<string | null> => {
  try {
    const lastSubmission = await submissionRepo.getLastSubmissionForGroup(
      groupName
    );

    if (!lastSubmission || !lastSubmission.submission.fileKey) {
      return null;
    }

    try {
      await client.send(
        new HeadObjectCommand({
          Bucket: "fintech-algo-2024",
          Key: lastSubmission.submission.fileKey,
        })
      );
    } catch (err) {
      submissionRepo
        .deleteSubmission(lastSubmission.submission.id)
        .catch(() => {});
    }

    return lastSubmission.submission.dateSubmitted;
  } catch (err) {
    console.error("Error getting submission for group", groupName, err);
    throw err;
  }
};

export const getAllSubmissions = async (
  requesterDiscordId: string
): Promise<SubmissionReport[]> => {
  if (requesterDiscordId !== "177019589010522112") {
    throw new Unauthorized("no");
  }

  try {
    const submissions = await submissionRepo.getAllSubmissions();
    return submissions
      .map((submission) => {
        return {
          submission: {
            id: submission.submission.id,
            dateSubmitted: submission.submission.dateSubmitted,
            groupName: submission.submission.groupName,
            isIndividual: submission.submission.isIndividual,
          },
          marking: submission.marking
            ? {
                id: submission.marking.id,
                score: submission.marking.score,
              }
            : null,
        };
      })
      .filter(
        (submission): submission is SubmissionReport =>
          submission.submission.dateSubmitted !== undefined &&
          submission.submission.groupName !== undefined
      );
  } catch (err) {
    console.error(
      "Error fetching all submissions",
      { requesterDiscordId },
      err
    );
    throw err;
  }
};

export const getSubmissionsForGroup = async (
  groupName: string
): Promise<SubmissionStatus[]> => {
  try {
    const submissions = await submissionRepo.getSubmissionsForGroup(groupName);
    return submissions
      .map((submission) => {
        return {
          submission: {
            id: submission.submission.id,
            dateSubmitted: submission.submission.dateSubmitted,
            markingOutput: submission.submission.markingOutput,
          },
          marked:
            submission.submission.markingOutput !== null ||
            submission.marking !== null,
        };
      })
      .filter(
        (submission): submission is SubmissionStatus =>
          submission.submission.dateSubmitted !== null
      );
  } catch (err) {
    console.error("Error getting submission for group", groupName, err);
    throw err;
  }
};
