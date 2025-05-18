import dynamic from "next/dynamic";
import Image from "next/image";
import { createStyles } from "@mantine/core";
import programmer from "../../public/programmer.png";

const EventTimeline = dynamic(() => import("./EventTimeline").then((mod) => mod.EventTimeline), {
  ssr: false,
});

const useStyles = createStyles((theme) => ({
  timelineContainer: {
    marginTop: theme.spacing.xl,
    color: "white",
    padding: "3rem 5rem",
    position: "relative",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: "3rem 3rem",
    },
  },
  timeline: {
    display: "flex",
    justifyContent: "center",
  },
  astronaut: {
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      display: "none",
    },
  },
  mobileAstronaut: {
    display: "none",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      display: "block",
      position: "absolute",
      overflow: "hidden",
      bottom: "-24px",
      right: "0px",
    },
  },
  astro: {
    position: "relative",
    bottom: "-15px",
    transform: "rotate(12deg)",
  },
}));

export const AlgoTimeline = () => {
  const { classes } = useStyles();

  return (
    <div id="timeline" className={classes.timelineContainer}>
      <EventTimeline />
      <div className={classes.astronaut}>
        <Image src={programmer} width={300} alt="programmer" />
      </div>
      <div className={classes.mobileAstronaut}>
        <Image className={classes.astro} src={programmer} width={100} alt="programmer" />
      </div>
    </div>
  );
};
