import {
  Button,
  Code,
  FileButton,
  Loader,
  Text,
  Title,
  Flex,
} from "@mantine/core";
import { useState } from "react";
import request, { AxiosError } from "axios";
import useSwr from "swr";
import {
  getLastSubmission,
  getUploadLink,
  markSubmissionReady,
} from "../../api/upload";
import { getDiscordUser } from "../../api/discord";
import { LastSubmission } from "./LastSubmission";
import Link from "next/link";
import { useRouter } from "next/router";

export const Submission = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>();

  const {
    data: discordMe,
    isLoading,
    error: discordMeError,
    mutate: refreshDiscordMe,
  } = useSwr("/discord/me", getDiscordUser);

  const {
    data: lastSubmissionData,
    isLoading: lastSubmissionIsLoading,
    mutate: refreshLastSubmission,
  } = useSwr("/upload/lastSubmission", getLastSubmission);

  const submit = async () => {
    if (!file) {
      return;
    }
    const { url, key, fields } = await getUploadLink();
    const uploadData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
      uploadData.append(key, value);
    }
    uploadData.append("Content-Type", file.type);
    uploadData.append("file", file);
    return request
      .post(url, uploadData, { withCredentials: false })
      .then(() => markSubmissionReady(key));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!discordMe) {
    return null;
  }

  const welcomeMessage = discordMe.teamDetails.isIndividual
    ? `Hey there ${
        discordMe.discordUser.global_name ?? discordMe.discordUser.username
      } 👋, ready to make a submission for yourself?`
    : `Hey there ${
        discordMe.discordUser.global_name ?? discordMe.discordUser.username
      } 👋, ready to make a submission for team ${
        discordMe.teamDetails.groupName ?? discordMe.discordUser.username
      }?`;

  return (
    <>
      <Title mb="xs">{welcomeMessage}</Title>
      <Text fz="lg" mb="xs">
        I&apos;m sure you know this already, but here are some things you should
        check and know before submitting:
      </Text>
      <div
        style={{
          paddingRight: "1rem",
        }}
      >
        <ul>
          <li>
            <Text fz="lg">
              Your main file (that is, the file with your{" "}
              <Code color="red">getMyPosition(...)</Code> function) is named{" "}
              <Code color="red">main.py</Code> and importable from the root
              directory
            </Text>
          </li>
          <li>
            <Text fz="lg">
              You have a <Code color="red">requirements.txt</Code> file in the
              root directory
            </Text>
            <ul>
              <li>
                We will install dependencies with{" "}
                <Code color="red">pip3 install -r requirements.txt</Code>, so
                make sure that works
              </li>
            </ul>
          </li>
          <li>
            <Text fz="lg">
              Your code takes no longer than <b>10 minutes</b> to run (this is
              our cut off!)
            </Text>
          </li>
          <li>
            <Text fz="lg">
              Your code will be tested on future, unseen price data from the
              same trading universe
            </Text>
          </li>
        </ul>
      </div>
      {!submitted ? (
        <>
          <Flex gap="xs" align="flex-start" wrap="wrap">
            <FileButton onChange={setFile} accept="application/zip">
              {(props) => (
                <Button {...props}>Click here to add your zipped bundle</Button>
              )}
            </FileButton>
            <Button
              disabled={!file}
              loading={submitting}
              onClick={() => {
                setSubmitting(true);
                setError(undefined);
                submit()
                  .then(() => {
                    refreshLastSubmission();
                    setSubmitted(true);
                    router.push("/submission/status");
                  })
                  .catch((err) => {
                    if (err instanceof AxiosError && err.response?.data?.msg) {
                      setError(err.response.data.msg);
                    } else {
                      setError(
                        "Uploading failed, we can only accept submissions up to 10MB."
                      );
                    }
                  })
                  .finally(() => setSubmitting(false));
              }}
            >
              Submit
            </Button>
          </Flex>
          {error && (
            <Text fw={700} color="fintechRed">
              {error}
            </Text>
          )}
          <Text>{file?.name}</Text>
        </>
      ) : (
        <Text color="fintechRed" fw={700} fz="lg">
          Your submission has been received, thank you for submitting! Make sure
          to check your submissions <Link href="/submission/status">here</Link>
        </Text>
      )}
      <LastSubmission
        isLoading={lastSubmissionIsLoading}
        lastSubmissionData={lastSubmissionData}
      />
    </>
  );
};
