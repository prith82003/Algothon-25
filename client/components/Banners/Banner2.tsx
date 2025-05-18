import Image from "next/image";
import { Title, Text, createStyles } from "@mantine/core";

import prizeAstronaut from "../../public/prize.png";

const useStyles = createStyles((theme) => ({
  bannerContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row-reverse",
  },
  card: {
    minHeight: "20rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: `0px ${theme.spacing.xl}`,
    borderRadius: theme.radius.md,
    padding: "3rem 5rem",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      width: "100%",
      padding: "2rem 2rem",
      flexDirection: "column-reverse",
    },
    zIndex: -2,
  },
  promo: {
    width: "70%",
    padding: `0rem ${theme.spacing.xl}`,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: `0rem`,
      width: "100%",
    },
  },
  prizes: {
    textAlign: "center",
    width: "30%",
    position: "relative",
    padding: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.fintechRed[4],
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      width: "100%",
      marginBottom: theme.spacing.xl,
    },
    boxShadow: "10px 5px 5px rgb(0, 0, 0, 0.15)",
  },

  prizeAstronaut: {
    transform: "scaleX(-1)",
    position: "absolute",
    top: "-84px",
    right: "7px",
  },
}));

export const Banner2 = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.bannerContainer}>
      <div className={classes.card}>
        <div className={classes.promo}>
          <Title order={2}>Get ready for lift-off… </Title>
          <Text fw={500} mt="md" fz="lg">
            FinTech Society and Susquehanna are thrilled to announce: 🚀🚀 Algothon 2025! 🚀🚀 
            UNSW Fintech Society&apos;s annual algorithmic trading competition is back for its sixth year, 
            bigger and better than ever! Immerse yourself in the realms of market making and 
            algorithmic trading with one of the globe&apos;s most influential quantitative trading 
            firms. Challenge your coding skills and push your knowledge boundaries with hands-on experiences. 
            Whether you team up with friends or go solo, this is your chance to showcase your creativity, 
            detailed analysis, and Susquehanna-level expertise in ensuring competitive market prices. Register 
            now for a shot at lucky door prizes and substantial cash rewards for the top three winners, 
            worth thousands of dollars! Prepare for the ultimate challenge and compete for the grand 
            first-place prize of five thousand dollars! Anticipate an unforgettable journey where you&apos;ll 
            forge lasting connections and create invaluable memories!
          </Text>
        </div>
        <div className={classes.prizes}>
          <div className={classes.prizeAstronaut}>
            <Image width={100} src={prizeAstronaut} alt="prize astronaut" />
          </div>
          <Text color="white" fz="xl">
            1st prize: <b>$5000</b>
          </Text>
          <Text color="white" fz="xl">
            2nd prize: <b>$2500</b>
          </Text>
          <Text color="white" fz="xl">
            3rd prize: <b>$1000</b>
          </Text>
          <Text color="white" fz="xs" mt="sm">
            * Max 2-4 people per team, prizes are total amounts given to individuals
          </Text>
        </div>
      </div>
    </div>
  );
};
