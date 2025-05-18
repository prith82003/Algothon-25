import { createStyles, Table, Text, Title } from "@mantine/core";
import Link from "next/link";

const finalsLeaderboard = [
  {
    teamName: "CookieAlgorists",
    score: "47.5954091097448",
    technical: "74.87698202",
    presentation: "20.833333",
    final: "95.71031502",
  },
  {
    teamName: "Algorithmically Based",
    score: "47.6736052541393",
    technical: "75",
    presentation: "19.166666",
    final: "94.16666599999999",
  },
  {
    teamName: "Deeptrade",
    score: "46.5538597502266",
    technical: "73.2384191",
    presentation: "20",
    final: "93.2384191",
  },
  {
    teamName: "Los Algos",
    score: "33.6562114603539",
    technical: "52.94787013",
    presentation: "20.416667",
    final: "73.36453713",
  },
  {
    teamName: "Bears Bulls",
    score: "29.4391032762472",
    technical: "46.31352578",
    presentation: "20.833333",
    final: "67.14685878",
  },
  {
    teamName: "Q",
    score: "27.5769320235797",
    technical: "43.38396248",
    presentation: "17.5",
    final: "60.88396248",
  },
  {
    teamName: "SVY",
    score: "22.6010290941416",
    technical: "35.55588408",
    presentation: "17.5",
    final: "53.05588408",
  },
  {
    teamName: "Big Knees",
    score: "9.70495342967678",
    technical: "15.26780917",
    presentation: "19.58333",
    final: "34.851139169999996",
  },
];

const generalLeaderboard = [
  { teamName: "Orion", score: 188.048848},
  { teamName: "Team2", score: 50.449301},
  { teamName: "Fortune", score: 39.564207},
  { teamName: "MMCandCo", score: 25.216217},
  { teamName: "Acturade", score: 11.65169},
  { teamName: "Strive", score: 11.256752},
  { teamName: "Fanta Lite", score: 8.168517},
  { teamName: "Los Algos Hermanos", score: 7.218449},
  { teamName: "Kongfu Panda", score: 6.562418},
  { teamName: "HODL", score: 5.488952},
  { teamName: "Empty", score: 5.333275},
  { teamName: "Scalar", score: 4.311917},
  { teamName: "Seem Goods!", score: 4.270529},
  { teamName: "Vital Trading Performance", score: 3.517467},
  { teamName: "Alpha Spotters", score: 3.084944},
  { teamName: "Anjayyy", score: 2.619851},
  { teamName: "AlgoNinjas", score: 2.383847},
  { teamName: "404_NotFound", score: 1.703376},
  { teamName: "Paradox", score: 1.703376},
  { teamName: "River City Capt", score: 1.536288},
  { teamName: "LiquidityCrackheads", score: 1.000326},
  { teamName: "Aromatic Algo Apes", score: 0.025092},
  { teamName: "Beacon", score: 0.00000},
  { teamName: "EngiNEARING our limits", score: -0.006645},
  { teamName: "BOB", score: -0.008189},
  { teamName: "U.N. Owen was her?", score: -0.091553},
  { teamName: "Citrine", score: -0.221051},
  { teamName: "The Lodge", score: -0.230274},
  { teamName: "Toxic Counterparties", score: -0.727766},
  { teamName: "pogchampions", score: -0.909857},
  { teamName: "Plan Managed™", score: -1.09076},
];

const leaderboard = [
  { teamName: "Catalyst", score: "23.869159" },
  { teamName: "TinkleTown", score: "15.911504" },
  { teamName: "robertdesimon", score: "10.598384" },
  { teamName: "404_NotFound", score: "2.393097" },
  { teamName: "HODL", score: "1.505678" },
  { teamName: "Three Wise Men", score: "1.330902" },
  { teamName: "Paradox", score: "0.000000" },
  { teamName: "HODL My Beer", score: "0.000000" },
  { teamName: "EngiNEARING our limits", score: "-0.036688" },
  { teamName: "Cash Cows", score: "-0.061874" },
  { teamName: "AlgoNinjas", score: "-0.545612" },
  { teamName: "Covariance matrix of U(0,1) over Serpinski triangle?", score: "-1.730129" },
  { teamName: "Belfort's Bandits", score: "-1.755812" },
  { teamName: "Acturade", score: "-3.225571" },
  { teamName: "High Entropy", score: "-3.428483" },
  { teamName: "Mooning", score: "-3.987542" },
  { teamName: "River City Capt", score: "-3.991514" },
  { teamName: "SIGma", score: "-6.889951" },
  { teamName: "macddie", score: "-7.359085" },
  { teamName: "QuantPro", score: "-8.175952" },
];

const useStyles = createStyles((theme) => ({
  finalRoundLeaderboardContainer: {
    color: "white",
    marginBottom: theme.spacing.xl,
    textAlign: "left",
    backgroundColor: theme.colors.spaceNavy[5],
    padding: theme.spacing.xl,
    overflow: "auto",
    borderRadius: theme.radius.md,
  },
  leaderboardContainer: {
    color: "white",
    marginBottom: theme.spacing.xl,
    textAlign: "left",
    backgroundColor: theme.colors.spaceNavy[1],
    padding: theme.spacing.xl,
    overflow: "auto",
    borderRadius: theme.radius.md,
  },
  firstRoundleaderboardContainer: {
    color: "white",
    marginBottom: theme.spacing.xl,
    textAlign: "left",
    backgroundColor: theme.colors.spaceNavy[1],
    padding: theme.spacing.xl,
    overflow: "auto",
    borderRadius: theme.radius.md,
  },
}));

export const Leaderboard = () => {
  const { classes } = useStyles();
  return (
    <>
      {/* <div className={classes.finalRoundLeaderboardContainer}>
        <Title mb="md" align="center">
          Final Round Ranking
        </Title>
        <Table horizontalSpacing="lg">
          <thead>
            <tr>
              <th>
                <Text color="white">Rank</Text>
              </th>
              <th>
                <Text color="white">Team</Text>
              </th>
              <th>
                <Text color="white">Score</Text>
              </th>
              <th>
                <Text color="white">Technical</Text>
              </th>
              <th>
                <Text color="white">Presentation</Text>
              </th>
              <th>
                <Text color="white">Final</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {finalsLeaderboard.map((entry, i) => {
              return (
                <tr key={entry.teamName}>
                  <td>
                    <Text fw={700} color="white">
                      {i + 1}
                    </Text>
                  </td>
                  <td>
                    <Text color="white" fw={700}>
                      {entry.teamName}
                    </Text>
                  </td>
                  <td>
                    <Text color="white" fw={700}>
                      {Number(entry.score).toFixed(2)}
                    </Text>
                  </td>
                  <td>
                    <Text fw={700} color="white">
                      {Number(entry.technical).toFixed(2)}
                    </Text>
                  </td>
                  <td>
                    <Text fw={700} color="white">
                      {Number(entry.presentation).toFixed(2)}
                    </Text>
                  </td>
                  <td>
                    <Text fw={700} color="white">
                      {Number(entry.final).toFixed(2)}
                    </Text>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div> */}
      <div className={classes.leaderboardContainer}>
        <Title mb="md" align="center">
          General Round Leaderboard
        </Title>
        <Table horizontalSpacing="lg">
          <thead>
            <tr>
              <th>
                <Text color="white">Rank</Text>
              </th>
              <th>
                <Text color="white">Team</Text>
              </th>
              <th>
                <Text color="white">Score</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {generalLeaderboard.map((entry, i) => {
              return (
                <tr key={entry.teamName}>
                  <td>
                    <Text fw={700} color="white">
                      {i + 1}
                    </Text>
                  </td>
                  <td>
                    <Text color="white" fw={700}>
                      {entry.teamName}
                    </Text>
                  </td>
                  <td>
                    <Text fw={700} color="white">
                      {entry.score}
                    </Text>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div> 
      <div className={classes.firstRoundleaderboardContainer}>
        <Title mb="md" align="center">
          Interim Leaderboard
        </Title>
        <Table horizontalSpacing="lg">
          <thead>
            <tr>
              <th>
                <Text color="white">Rank</Text>
              </th>
              <th>
                <Text color="white">Team</Text>
              </th>
              <th>
                <Text color="white">Score</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, i) => {
              return (
                <tr key={entry.teamName}>
                  <td>
                    <Text fw={700} color="white">
                      {i + 1}
                    </Text>
                  </td>
                  <td>
                    <Text color="white" fw={700}>
                      {entry.teamName}
                    </Text>
                  </td>
                  <td>
                    <Text fw={700} color="white">
                      {entry.score}
                    </Text>
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
