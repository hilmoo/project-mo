import { Center, Paper, ScrollArea } from "@mantine/core";

export function DescSec({ description }: { description: string }) {
  return (
    <Center>
      <Paper
        shadow="xs"
        withBorder
        p="md"
        h={{ base: 335, md: 535, lg: 795 }}
        maw={700}
        w={"100%"}
      >
        <ScrollArea
          h={{ base: 300, md: 500, lg: 765 }}
          scrollbars="y"
          type="never"
        >
          <div style={{ whiteSpace: "pre-wrap" }}>{description}</div>
        </ScrollArea>
      </Paper>
    </Center>
  );
}
