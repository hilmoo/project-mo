import { ActionIcon, Button, Container, Group, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { MoLogo } from "components/MoLogo/MoLogo";
import classes from "./Header.module.css";

import ToggleColorSmall from "@/components/ActionIcon/ToggleColor/Index";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";

export function Header() {
  const matchessm = useMediaQuery("(min-width: 36em)");
  const matchesssm = useMediaQuery("(min-width: 22em)");

  const uploadButton = matchesssm ? (
    <Button
      size="md"
      aria-label="Upload Competition"
      radius="md"
      leftSection={<IconUpload size={20} stroke={2}/>}
    >
      <Text>Upload Lomba</Text>
    </Button>
  ) : (
    <ActionIcon size="xl" aria-label="Upload Competition" radius="md">
      <IconUpload />
    </ActionIcon>
  );
  return (
    <header className={classes.header}>
      <Container size="xl">
        <div className={classes.inner}>
          <Link to="">
            <MoLogo size={40} type={matchessm ? "infolomba" : "mini"} />
          </Link>
          <Group>
            {uploadButton}
            <ToggleColorSmall />
          </Group>
        </div>
      </Container>
    </header>
  );
}
