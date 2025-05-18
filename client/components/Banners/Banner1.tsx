import { useRef, useEffect, useState } from "react";
import { Title, Text, Button, createStyles, Card, px } from "@mantine/core";
import Image from "next/image";
import { OuterLimitsUpright } from "../../fonts";
import { OuterLimitsExtUpright } from "../../fonts";

import { events } from "../../events";
import bg from "../../public/bg.png";
import fintechxsig from "../../public/fintechxsig.png";
import cover from "../../public/cover.png";
import Link from "next/link";
import { Leaderboard } from "../Leaderboard";

const useStyles = createStyles((theme) => ({
    banner1: {
      padding: "3rem 5rem",
      display: "flex",
      minHeight: "35rem",
      alignItems: "center",
      marginTop: theme.spacing.xs,
      justifyContent: "center",
      textAlign: "center",
      position: "relative",
      [`@media (max-width: ${theme.breakpoints.md})`]: {
        margin: `0`,
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "30rem",
        padding: "2rem 2rem",
      },
    },
    cta: {
      display: "flex",
      justifyContent: "center",
      gap: `0px ${theme.spacing.xs}`,
      [`@media (max-width: ${theme.breakpoints.md})`]: {
        flexDirection: "column",
      },
    },
    title: {
      fontSize: "4rem",
      [`@media (max-width: ${theme.breakpoints.md})`]: {
        fontSize: "3rem",
      },
      color: "rgb(255, 255, 255, .9)",
      textShadow:
        "-3px 0px 0px rgb(255, 255, 255, .5), -6px 2px 0px rgb(255, 255, 255, .2)",
    },
    registerInfo: {
      marginTop: theme.spacing.xl,
    },
    bg: {
      zIndex: -11,
      borderRadius: theme.radius.xl,
      objectFit: "cover",
      [`@media (max-width: ${theme.breakpoints.md})`]: {
        borderRadius: "0px",
      },
    },
    countdownCard: {
      borderRadius: theme.radius.lg,
      backgroundColor: "rgb(11, 97, 98, .95)",
      padding: theme.spacing.sm,
      width: "80%",
      margin: "auto",
      [`@media (max-width: ${theme.breakpoints.md})`]: {
        width: "100%",
      },
    },
    countdown: {
      display: "flex",
      justifyContent: "center",
      gap: theme.spacing.xs,
      position: "relative",
      bottom: "35px",
    },
    time: {
      backgroundColor: "white",
      padding: theme.spacing.sm,
      borderRadius: theme.radius.md,
      width: "3rem",
      height: "3rem",
    },
    collabImage: {
      marginBottom: theme.spacing.xl,
    },
    noUnderlineLink: {
      textDecoration: "none",
    },
  }));

export const Banner1 = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.banner1}>
      <Image priority src={bg} alt="bg" fill className={classes.bg} />
      <div>
        <div className={classes.collabImage}>
          <Image width={300} priority src={fintechxsig} alt="fintech and sig" />
        </div>
        <Title
          className={classes.title + " " + OuterLimitsExtUpright.className}
          order={1}
        >
          Algothon
        </Title>
        <Title
          className={classes.title + " " + OuterLimitsExtUpright.className}
          order={1}
        >
          2025
        </Title>
        <div className={classes.registerInfo}>
          <Countdown />
          <div className={classes.cta}>
            {/* <Link
                className={classes.noUnderlineLink}
                href="https://forms.gle/B1BV3vnHB3wvXsSL8"
              >
                <Button
                  fullWidth
                  variant="white"
                  c="black"
                  size="lg"
                  mt="sm"
                  radius={0}
                >
                  Register as Individual
                </Button>
            </Link> */}
            
            <Link
              className={classes.noUnderlineLink}
              href="https://wiki.algothon.au/5submission/"
            >
              <Button
                fullWidth
                variant="white"
                c="black"
                size="lg"
                mt="sm"
                radius={0}
              >
                Past Resources
              </Button>
            </Link>
            {/* <Link className={classes.noUnderlineLink} href="/leaderboard">
              <Button
                fullWidth
                variant="white"
                c="black"
                size="lg"
                mt="sm"
                radius={0}
              >
                Check how your team went →
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const countdowns = [
  {
    eventLabel: "Commencing on June 12th (Registrations Close June 13th, 11:59PM)",
    countdownTo: new Date("2025-07-12T07:00:00.000Z"),
  },
  {
    eventLabel: "Submissions for Leaderboard Update",
    countdownTo: new Date("2025-07-30T23:23:59.000Z"),
  },
  {
    eventLabel: "General Round Closes",
    countdownTo: new Date("2024-08-14T21:00:00.000Z"),
  },
  {
    eventLabel: "Final Round Closes",
    countdownTo: new Date("2024-08-25T21:00:00.000Z"),
  },
  {
    eventLabel: "Final Presentations",
    countdownTo: new Date("Sat Aug 07 2025 14:00:00 GMT+1000 (Australian Eastern Standard Time)"),
  },
];

const Countdown = () => {
  const { classes } = useStyles();

  const [upcomingEvent, setUpcomingEvent] = useState(getNextEvent());
  const [secondsDue, setSecondsDue] = useState(0);

  const countdownRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!upcomingEvent) {
      return;
    }

    const startDate = new Date(upcomingEvent.countdownTo);
    setSecondsDue(startDate.getTime() - Date.now());

    countdownRef.current = setInterval(() => {
      const secondsLeft = startDate.getTime() - Date.now();
      if (secondsLeft <= 0) {
        setUpcomingEvent(getNextEvent());
      } else {
        setSecondsDue(secondsLeft);
      }
    }, 100);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [upcomingEvent]);

  const seconds = secondsDue % (1000 * 60);
  const minutes = (secondsDue - seconds) % (1000 * 60 * 60);
  const hours = (secondsDue - minutes) % (1000 * 60 * 60 * 24);
  const days = (secondsDue - minutes - hours) / (1000 * 60 * 60 * 24);

  return (
    <>
      <div className={classes.countdownCard}>
        <Text style={{ marginBottom: "2.5rem" }} color="white" fw={700}>
          {upcomingEvent?.eventLabel ?? "Get coding!"}
        </Text>
      </div>
      <div className={classes.countdown}>
        <div>
          <div className={classes.time}>
            <Text color="black" fw={700}>{formatTime(Math.floor(days))}</Text>
          </div>
          <Text fz="xs" color="white">
            Days
          </Text>
        </div>
        <div>
          <div className={classes.time}>
            <Text color="black" fw={700}>{formatTime(Math.floor(hours / 1000 / 60 / 60))}</Text>
          </div>
          <Text fz="xs" color="white">
            Hrs
          </Text>
        </div>
        <div>
          <div className={classes.time}>
            <Text color="black" fw={700}>{formatTime(Math.floor(minutes / 1000 / 60))}</Text>
          </div>
          <Text fz="xs" color="white">
            Mins
          </Text>
        </div>
        <div>
          <div className={classes.time}>
            <Text color="black" fw={700}>{formatTime(Math.floor(seconds / 1000))}</Text>
          </div>
          <Text fz="xs" color="white">
            Secs
          </Text>
        </div>
      </div>
    </>
  );
};

const formatTime = (time: number) => time.toString().padStart(2, "0");

const getNextEvent = () => countdowns.find((countdown) => countdown.countdownTo.getTime() >= Date.now());
