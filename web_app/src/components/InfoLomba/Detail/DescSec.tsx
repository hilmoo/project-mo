import { Center, Paper, ScrollArea } from "@mantine/core";

export function DescSec({ description }: { description: string }) {
  return (
    <Center>
      <Paper shadow="xs" withBorder p="md" h={{ base: 335, md: 535, lg: 795 }} maw={700}>
        <ScrollArea h={{ base: 300, md: 500, lg: 795 }} scrollbars="y" type="auto">
          {description}
        </ScrollArea>
      </Paper>
    </Center>
  );
}
