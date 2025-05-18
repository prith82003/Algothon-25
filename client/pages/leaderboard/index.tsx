import Link from "next/link";
import { Alert, Code, createStyles, Text } from "@mantine/core";
import { Leaderboard } from "../../components/Leaderboard";
import { IconAlertCircle, IconThumbUp } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  boardContainer: {
    maxWidth: "50rem",
    margin: `${theme.spacing.md} auto`,
  },
}));

export default function LeaderboardPage() {
  const { classes } = useStyles();
  return (
    <div className={classes.boardContainer}>
      {/* <Alert
        mb="xs"
        icon={<IconThumbUp size="1rem" />}
        title="Congratulations and thank you for participating!"
        variant="filled"
        color="blue.9"
        radius="md"
      >
        <Text fz="md">
          Congratulations for making it this far! If your team is on here you
          can have a look at your day to day performance{" "}
          <Link href="/finalistStats">
            <Text span>here</Text>
          </Link>
        </Text>
      </Alert> */}
      <Leaderboard />
    </div>
  );
}
