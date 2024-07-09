import {
  AspectRatio,
  Badge, 
  Card,
  Group,
  Image,
  ScrollArea,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import moment from "moment";

interface data_interface {
  id: number;
  name: string;
  organizer: string;
  deadline: number;
  image: string;
  category: Array<string>;
}

export function CardLomba(data: data_interface) {
  const deadline = data.deadline;
  const localTimeDeadline = moment.unix(deadline).toDate().toLocaleString();
  const category = data.category.map((item) => (
    <Badge  px={5} size="md" key={item}>
      {item}
    </Badge >
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
          <Image src={data.image} fit="contain" />
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
          Deadline: {localTimeDeadline}
        </Text>
      </ScrollArea>
    </Card>
  );
}
