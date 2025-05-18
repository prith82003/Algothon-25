import type { NextPage } from "next";
import { createStyles } from "@mantine/core";

import { Header, Introduction, Challenge, FAQ } from "../components/Banners";
import { AlgoTimeline } from "../components/Timeline";
import { Navbar } from "../components/Navbar";
import Footer2 from "../components/Footer/Footer2";
import { Leaderboard } from "../components/Leaderboard";

const useStyles = createStyles(() => ({
  container: {
    maxWidth: "80rem",
    margin: "auto",
    "@media (max-width: 600px)": {
      maxWidth: "100%",
    },
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Navbar />
        <Header />
        <Introduction />
        <Challenge />
        <AlgoTimeline />
        <FAQ />
        <Footer2 />
      </div>
    </>
  );
};

export default Home;
