import { useMemo } from "react";
import Link from "next/link";
import { createStyles, Title, Text, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SocialIcon } from "react-social-icons";

import Image from "next/image";
import Logo from "../../public/fintech-logo.svg";
import SIGLOGO from "../../public/sig-logo.svg";
import { events } from "../../events";

const useStyles = createStyles((theme) => ({
  card: {
    marginTop: "3rem",
    minHeight: "20rem",
    gap: `0px ${theme.spacing.xl}`,
    borderRadius: `${theme.radius.xl} ${theme.radius.xl} 0px 0px`,
    padding: "3rem 2rem",
    backgroundColor: "#4c6fc0",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: "2rem 2rem",
      borderRadius: "0px",
      flexDirection: "column",
    },
  },
  links: {
    padding: `0rem ${theme.spacing.xl}`,
    display: "flex",
    justifyContent: "center",
    gap: "0px 5.5rem",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: `0rem`,
      flexDirection: "column",
      alignItems: "center",
    },
  },
  socials: {
    display: "flex",
    gap: theme.spacing.md,
  },
  otherLogos: {
    marginTop: theme.spacing.xl,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem 5.5rem",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      flexDirection: "column",
    },
  },
}));

const Footer2 = () => {
  const { classes } = useStyles();

  const rulesAndDocsAvailable = useMemo(() => Date.now() >= new Date(events[4].date).getTime(), []);

  const [rulesModalOpened, { close: closeRulesModal, open: openRulesModal }] = useDisclosure(false);
  return (
    <div className={classes.card}>
      <div className={classes.links}>
        {/* <div>
          <Link
            style={{ textDecoration: "none" }}
            href="https://discord.com/invite/73B2mgJBWN"
          >
            <Title mb="xl" color="white">
              Discord
            </Title>
          </Link>
        </div> */}
        <div>
          <Modal opened={rulesModalOpened} onClose={closeRulesModal} withCloseButton={false} centered>
            <Text>Rules and Docs are currently unavailable.</Text>
            <Text color="dimmed" fz="sm">
              The rules and documentation site will be published when the competition is launched on June 19th.
            </Text>
          </Modal>
          {rulesAndDocsAvailable ? (
            <Link style={{ textDecoration: "none" }} href="https://wiki.algothon.au/">
              <Title mb="xl" color="white">
                Rules & Docs
              </Title>
            </Link>
          ) : (
            <UnstyledButton>
              <Title mb="xl" color="white" onClick={openRulesModal}>
                Rules & Docs
              </Title>
            </UnstyledButton>
          )}
        </div>
      </div>
      <div className={classes.otherLogos}>
        <Image src={Logo} width={200} alt="fintech logo" />
        <div className={classes.socials}>
          <SocialIcon url="https://www.instagram.com/unswfintechsoc/" bgColor={"#FFF"} />
          <SocialIcon url="https://www.facebook.com/unswfintechsoc" bgColor={"#FFF"} />
          <SocialIcon url="https://www.linkedin.com/company/unswfintechsoc/" bgColor={"#FFF"} />
          <SocialIcon url="https://unswfintech.com/" bgColor={"#FFF"} />
        </div>
        <Image src={SIGLOGO} width={200} alt="SIG logo" />
      </div>
    </div>
  );
};

export default Footer2;
