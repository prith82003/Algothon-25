import { Text, Loader } from "@mantine/core";
import { getLastSubmission } from "../../api/upload";
import useSwr from "swr";

export type LastSubmissionProps = {
  isLoading: boolean;
  lastSubmissionData?: string | null;
};
export const LastSubmission = ({
  isLoading,
  lastSubmissionData,
}: LastSubmissionProps) => {
  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (lastSubmissionData === undefined) {
    return null;
  }

  if (lastSubmissionData === null) {
    return (
      <Text mt="xs" c="dimmed" fs="italic">
        We don&apos;t have a submission from you yet!
      </Text>
    );
  }

  return (
    <Text mt="xs" c="dimmed" fs="italic">
      Your group last submitted on{" "}
      {new Date(lastSubmissionData).toLocaleString()}
    </Text>
  );
};
