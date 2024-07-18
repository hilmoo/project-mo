import { Button, Center } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";

export function Tail({ url }: { url: string }) {
  const icon = <IconSend2 stroke={2} />;
  return (
    <Center py="md">
      <Button
        fullWidth
        size="lg"
        rightSection={icon}
        component="a"
        href={url}
        target="_blank"
      >
        Daftar Lomba
      </Button>
    </Center>
  );
}
