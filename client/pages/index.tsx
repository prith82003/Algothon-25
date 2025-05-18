import type { NextPage } from "next";
import { createStyles } from "@mantine/core";

import { Banner1, Banner2, Banner3, Banner4 } from "../components/Banners";
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
        <Banner1 />
        <Banner2 />
        <Banner3 />
        <AlgoTimeline />
        <Banner4 />
        <Footer2 />
      </div>
    </>
  );
};

export default Home;
