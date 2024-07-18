import { Badge, Grid, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { Category } from "types/infolomba";
import classes from "./Header.module.css";

export function Header({
  organizer,
  deadline,
  category,
}: {
  organizer: string;
  deadline: string;
  category: Array<Category>;
}) {
  const badgeCategory = category.map((item) => (
    <Badge size="md" key={item.id}>
      {item.name}
    </Badge>
  ));

  return (
    <Grid gutter="xs">
      <Grid.Col span={{ base: 12, lg: 5 }} className={classes.gridCont}>
        <Stack
          bg="var(--mantine-color-body)"
          align="flex-start"
          justify="flex-start"
          gap="xs"
        >
          <Text size="lg">Penyelenggara: {organizer}</Text>
          <Text size="lg">Deadline: {deadline}</Text>
        </Stack>
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, lg: 7 }}
        className={classes.gridContCat}
        h={{ base: 50, md: "auto", lg: "auto" }}
      >
        <Text size="lg" pr="md">
          Kategori:
        </Text>
        <ScrollArea
          type="auto"
          h={{ md: 50, lg: 70 }}
          scrollbars="y"
          className={classes.Category}
        >
          <Group gap="xs">{badgeCategory}</Group>
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}
