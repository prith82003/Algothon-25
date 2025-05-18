import { createStyles, Loader } from "@mantine/core";
import { Submission } from "../../components/Submission";
import useSwr from "swr";
import { getDiscordUser } from "../../api/discord";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  submissionContainer: {
    marginTop: theme.spacing.xl,
    marginLeft: theme.spacing.xl,
  },
}));

const redirectLink = encodeURIComponent(process.env.NEXT_PUBLIC_API + "/auth");

export default function DiscordCode() {
  const router = useRouter();
  const { classes } = useStyles();

  const {
    data: discordMe,
    isLoading,
    error: discordMeError,
    mutate: refreshDiscordMe,
  } = useSwr("/discord/me", getDiscordUser);

  if (discordMeError) {
    router.replace(
      `https://discord.com/oauth2/authorize?client_id=1136202172078493816&redirect_uri=${redirectLink}&response_type=code&scope=identify%20guilds%20email%20guilds.members.read`
    );
  }

  return (
    <div className={classes.submissionContainer}>
      <Submission />
    </div>
  );
}
