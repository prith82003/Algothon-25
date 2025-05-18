import { Title, Text, createStyles, Card } from "@mantine/core";
import Image from "next/image";
import rocketman from "../../public/rocketman.png";

const useStyles = createStyles((theme) => ({
  bannerContainer: {
    position: "relative",
    marginTop: theme.spacing.xl,
    alignItems: "center",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      marginTop: theme.spacing.xl,
    },
  },
  card: {
    minHeight: "20rem",
    gap: `0px ${theme.spacing.xl}`,
    borderRadius: theme.radius.xl,
    padding: "3rem 5rem",
    backgroundColor: "rgb(1, 28, 74, .95)",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: "2rem 2rem",
      borderRadius: "0px",
      flexDirection: "column",
    },
  },
  rocketman: {
    position: "absolute",
    left: "1px",
    top: "-80px",
    zIndex: -1,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      transform: "scaleX(-1)",
      right: "1px",
    },
  },
  body: {
    padding: `0rem ${theme.spacing.xl}`,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: `0rem`,
    },
  },
}));

export const Banner3 = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.bannerContainer}>
      <div className={classes.rocketman}>
        <Image src={rocketman} width={100} alt="programmer" />
      </div>
      <div className={classes.card}>
        <div className={classes.body}>
          <Title color="white">The Challenge</Title>
          <Text fw={500} color="white" mt="md" fz="lg">
            Over several weeks, be prepared to dive into a dynamic, multi-stage 
            competition! Your aim will be to build a sophisticated trading 
            algorithm designed to maximize profits in our simulated 
            trading environment. Compete solo or in teams of two to 
            three, acquiring essential skills through FinTech Soc’s 
            custom technical workshops in collaboration with SIG. 
            The contest starts with an introductory phase, allowing 
            you to brainstorm and establish your solution&apos;s foundation. 
            As the competition progresses, you&apos;ll enhance your model 
            using our testing dataset, striving to reach the top of the 
            leaderboard. An interim update offers a chance to tweak and 
            perfect your algorithm. The leading finalists will have a week 
            to polish their solutions before presenting their comprehensive 
            technical journey to a panel at the SIG Sydney office. If you&apos;re 
            outside Sydney, don&apos;t worry—SIG and FinTech Soc will cover your travel. 
            Ready to take on the challenge? Let’s start trading!
          </Text>
        </div>
      </div>
    </div>
  );
};
