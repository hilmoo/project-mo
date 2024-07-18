import {
  AspectRatio,
  Badge,
  Card,
  Group,
  Image,
  ScrollArea,
  Text,
} from "@mantine/core";
import { Link } from "@remix-run/react";

import { Competition } from "types/infolomba";
import classes from "./Card.module.css";

export function CardLomba(data: Competition) {
  const category = data.category.map((item) => (
    <Badge px={5} size="md" key={item.id}>
      {item.name}
    </Badge>
  ));

  return (
    <Card
      shadow="sm"
      component={Link}
      key={data.id}
      to={`detail/${data.id}`}
      className={classes.card}
    >
      <Card.Section>
        <AspectRatio ratio={1080 / 1350}>
          <Image loading="lazy" src={data.image} fit="contain" />
        </AspectRatio>
      </Card.Section>

      <ScrollArea type="never">
        <Group
          preventGrowOverflow={false}
          wrap="nowrap"
          mt="xs"
          className={classes.cardGroupCategory}
        >
          {category}
        </Group>
      </ScrollArea>

      <ScrollArea type="never">
        <Text fw={700} size="xl" tt="uppercase" className={classes.cardText}>
          {data.name}
        </Text>
      </ScrollArea>

      <ScrollArea type="never">
        <Text size="sm" tt="uppercase" fw={400} className={classes.cardText}>
          {data.organizer}
        </Text>
      </ScrollArea>

      <ScrollArea type="never">
        <Text size="xs" tt="capitalize" fw={200} className={classes.cardText}>
          Deadline: {data.deadline}
        </Text>
      </ScrollArea>
    </Card>
  );
}
