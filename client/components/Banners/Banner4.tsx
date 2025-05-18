import { Title, Text, createStyles, Card, Accordion } from "@mantine/core";

const QA: { q: string; a: string }[] = [
  {
    q: "What is Algothon?",
    a: "Algothon is an algorithmic trading hackathon, consisting of workshops, followed by an opportunity to design and build data-driven trading algorithms using modelling and quant techniques.",
  },
  {
    q: "Do I need to be a university student?",
    a: "Any current students at an Australian or New Zealand university are eligible to participate. \nBachelor, Master and PhD students are all welcome.",
  },
  {
    q: "Do I need to be an Australian citizen?",
    a: "No, international students are very welcome to participate, as long as they are a current student at an Australian or New Zealand university.",
  },
  {
    q: "Do I need a pre-organised team to enter?",
    a: "No, both individuals and teams are able to register. Individuals will be placed into a discord group where they can see all other individual registrants. They will be given each other’s general information like university and degree and encouraged to reach out to each other to form a team. Otherwise, individuals will be placed into a pre-assigned team at the end of the registration period.",
  },
  {
    q: "How large can our teams be?",
    a: "Teams must consist of 2-3 students.",
  },
  {
    q: "Is a finance or coding background required?",
    a: "While basic coding ability and financial knowledge will be advantageous in implementing your strategies, neither are necessary. Note, however, that many of our resources assume at least minimal programming ability. We recommend at least one member of your team be proficient in a coding language such as Python.",
  },
  {
    q: "How can I prepare for the Algothon?",
    a: "Please look out for our Algothon workshops and their respective recordings. \nAdditionally, you may need to perform some additional research, and use some supplementary learning resources.",
  },
  {
    q: "Where will the event be held?",
    a: "The 2024 Algothon will be held online (It is up to your group to complete your submission in your own time). \nWe will have an in-person launch event at UNSW (virtually streamed for out of state participants). \nFinalists will be invited to SIG's Barangaroo office in Sydney for the presentation and closing ceremony. Costs will be paid for if you do not reside in Sydney.",
  },
];

const useStyles = createStyles((theme) => ({
  bannerContainer: {
    position: "relative",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    alignItems: "center",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      marginTop: theme.spacing.xl,
    },
  },
  card: {
    minHeight: "20rem",
    gap: `0px ${theme.spacing.xl}`,
    borderRadius: theme.radius.xl,
    padding: "3rem 2rem",
    backgroundColor: "rgb(1, 28, 74, .95)",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: "2rem 2rem",
      borderRadius: "0px",
      flexDirection: "column",
    },
  },
  body: {
    padding: `0rem ${theme.spacing.xl}`,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      padding: `0rem`,
    },
  },
  accordionItem: {
    marginTop: `${theme.spacing.xs} !important`,
  },
  prewrapText: {
    whiteSpace: "pre-wrap",
  },
}));

export const Banner4 = () => {
  const { classes } = useStyles();
  return (
    <div id="faq" className={classes.bannerContainer}>
      <div className={classes.card}>
        <div className={classes.body}>
          <Title mb="xl" color="white">
            FAQ
          </Title>
          <Accordion
            classNames={{
              item: classes.accordionItem,
            }}
            radius="md"
            variant="separated"
          >
            {QA.map((qa, i) => {
              return (
                <Accordion.Item key={i} value={i.toString()}>
                  <Accordion.Control>
                    <b>{qa.q}</b>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text className={classes.prewrapText}>{qa.a}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
