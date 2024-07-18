import { Button, Center } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";

export function Tail({ url }: { url: string }) {
  const icon = <IconSend2 stroke={2} />;
  return (
    <Center py="md">
      <Button
        fullWidth
        size="lg"
        maw={700}
        rightSection={icon}
        component="a"
        href={`${url.startsWith("http://") || url.startsWith("https://") ? "" : "https://"}${url}`}
        target="_blank"
      >
        Daftar Lomba
      </Button>
    </Center>
  );
}
