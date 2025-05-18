import { memo, useMemo, useState } from "react";
import { createStyles, Group, Loader, RangeSlider, Text } from "@mantine/core";
import useSwr from "swr";
import dynamic from "next/dynamic";

import { getMarks } from "../../api/marks";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((m) => m.ResponsiveLine),
  { ssr: false }
);

const extractScores = (data: number[], range: [number, number]) =>
  data
    .slice(range[0], range[1] + 1)
    .map((score, i) => ({ x: i + range[0], y: score }));

const useStyles = createStyles((theme) => ({
  container: {
    margin: `${theme.spacing.xl} auto`,
    width: "90%",
    height: "85vh",
  },
}));

type ChartProps = {
  data: {
    id: string;
    data: {
      x: number;
      y: number;
    }[];
  }[];
  min: number;
  max: number;
};

const Chart = memo(function Chart({ data, min, max }: ChartProps) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "linear", min: "auto" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        reverse: false,
      }}
      yFormat=">-.2f"
      axisTop={null}
      axisRight={null}
      pointColor={{ theme: "background" }}
      colors={{ scheme: "category10" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      enableSlices="x"
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
});

export default function FinalistStats() {
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [range, setRangeEndValue] = useState<[number, number]>(rangeValue);
  const dayRange = [
    Math.round((range[0] / 100) * 250 + 750),
    Math.round((range[1] / 100) * 250 + 750),
  ];

  const { classes } = useStyles();

  const { data: allMarks } = useSwr("/static/data/q.json", getMarks);

  const data = useMemo(() => {
    const dataRange = [(range[0] / 100) * 250, (range[1] / 100) * 250] as [
      number,
      number
    ];

    return [
      {
        id: "bigknees",
        data: extractScores(allMarks?.bigkneesMarks ?? [], dataRange),
      },
      {
        id: "Q",
        data: extractScores(allMarks?.qMarks ?? [], dataRange),
      },
      {
        id: "Bears, Bulls, Battlestar Gallactica",
        data: extractScores(allMarks?.bearsBullsMarks ?? [], dataRange),
      },
      {
        id: "CookieAlgorists",
        data: extractScores(allMarks?.cookieAlgoMarks ?? [], dataRange),
      },
      {
        id: "Deeptrade<3",
        data: extractScores(allMarks?.deepTradeMarks ?? [], dataRange),
      },
      {
        id: "Los Algos Hermanos",
        data: extractScores(allMarks?.losAlgosMarks ?? [], dataRange),
      },
      {
        id: "SVY",
        data: extractScores(allMarks?.svyMarks ?? [], dataRange),
      },
      {
        id: "Algorithmically Based",
        data: extractScores(allMarks?.algorithmicMarks ?? [], dataRange),
      },
    ];
  }, [
    allMarks?.algorithmicMarks,
    allMarks?.bearsBullsMarks,
    allMarks?.bigkneesMarks,
    allMarks?.cookieAlgoMarks,
    allMarks?.deepTradeMarks,
    allMarks?.losAlgosMarks,
    allMarks?.qMarks,
    allMarks?.svyMarks,
    range,
  ]);

  if (!allMarks) {
    return (
      <Group position="center" mt="xl">
        <Loader />
        <Text>Loading the data just for you...</Text>
      </Group>
    );
  }

  return (
    <div className={classes.container}>
      <Group position="center" mb="xl">
        <Text>
          Displaying days {dayRange[0]} - {dayRange[1]}
        </Text>
      </Group>
      <RangeSlider
        step={1}
        label={null}
        value={rangeValue}
        onChange={setRangeValue}
        onChangeEnd={setRangeEndValue}
      />
      <Chart data={data} min={dayRange[0]} max={dayRange[1]} />
      <Text c="dimmed">Data from days 750-1000 only</Text>
    </div>
  );
}
