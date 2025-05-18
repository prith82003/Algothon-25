import useSwr from "swr";
import {
  Table,
  Text,
  Code,
  createStyles,
  Badge,
  Alert,
  Loader,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { getSubmissionStatus } from "../../../api/upload";
import { getDiscordUser } from "../../../api/discord";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: "100rem",
    padding: theme.spacing.lg,
  },
  tableContainer: {
    overflow: "auto",
  },
}));

const redirectLink = encodeURIComponent(process.env.NEXT_PUBLIC_API + "/auth");

export default function Status() {
  const { classes } = useStyles();
  const router = useRouter();

  const { error: discordMeError } = useSwr("/discord/me", getDiscordUser);

  const { data: submissionsData, isLoading: submissionsDataIsLoading } = useSwr(
    "/upload/status",
    getSubmissionStatus,
    {
      refreshInterval: 1000 * 10,
    }
  );

  if (discordMeError) {
    router.replace(
      `https://discord.com/oauth2/authorize?client_id=1136202172078493816&redirect_uri=${redirectLink}&response_type=code&scope=identify%20guilds%20email%20guilds.members.read`
    );
  }

  if (submissionsDataIsLoading) {
    return <Loader m="xl" />;
  }

  if (submissionsData && submissionsData.length > 0) {
    return (
      <div className={classes.container}>
        {submissionsData[0].submission.markingOutput !== null ? (
          <Alert
            mb="xl"
            icon={<IconAlertCircle size="1rem" />}
            title="We couldn't mark your last submission :("
            variant="filled"
            color="red.9"
          >
            This could mean something is wrong with the code you submitted, or
            our auto marking screwed up. Let us know in the Discord if you need
            help!
          </Alert>
        ) : null}
        <div className={classes.tableContainer}>
          <Table striped>
            <thead>
              <tr>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Additional Info</th>
              </tr>
            </thead>
            <tbody>
              {submissionsData?.map((submission) => {
                return (
                  <tr key={submission.submission.id}>
                    <td>
                      {new Date(
                        submission.submission.dateSubmitted
                      ).toLocaleString()}
                    </td>
                    <td>
                      <MarkedStatusPill
                        marked={submission.marked}
                        markingOutput={submission.submission.markingOutput}
                      />
                    </td>
                    <td>
                      {submission.submission.markingOutput ? (
                        <Code block color="red">
                          {submission.submission.markingOutput}
                        </Code>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  return <Text m="xl">You have made no submissions yet :(</Text>;
}

type MarkedStatusPill = {
  marked: boolean;
  markingOutput: string | null;
};
const MarkedStatusPill = ({ marked, markingOutput }: MarkedStatusPill) => {
  if (!marked) {
    return (
      <Badge variant="filled" color="gray.6">
        <Text color="white">Awaiting Marking</Text>
      </Badge>
    );
  }

  if (marked && markingOutput === null) {
    return (
      <Badge variant="filled" color="green.9">
        Marked
      </Badge>
    );
  }

  if (marked && typeof markingOutput === "string") {
    return (
      <Badge variant="filled" color="red.9">
        Errored
      </Badge>
    );
  }

  return null;
};
