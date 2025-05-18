import { useMemo } from "react";
import { Timeline, Text, createStyles } from "@mantine/core";
import { events } from "../../events";

export const EventTimeline = () => {
  const activeTimelineItem = useMemo(() => events.findIndex((event) => new Date(event.date) > new Date()) - 1, []);
  return (
    <Timeline active={activeTimelineItem} bulletSize={24} lineWidth={4}>
      {events.map((event, i) => {
        return (
          <Timeline.Item key={i} title={<Text color="white">{event.name}</Text>}>
            <Text color="white" size="xs" mt={4}>
              {new Date(event.date).toLocaleDateString()}
            </Text>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
