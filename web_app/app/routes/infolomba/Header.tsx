import { ActionIcon, Button, Container, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, useLocation } from "@remix-run/react";
import { IconUpload } from "@tabler/icons-react";
import { MoLogo } from "~/components/MoLogo/MoLogo";

import ToggleColorSmall from "~/components/ActionIcon/ToggleColor/Index";
import classes from "./Header.module.css";

export function Header() {
  const matchessm = useMediaQuery("(min-width: 36em)");
  const matchesssm = useMediaQuery("(min-width: 26em)");
  const location = useLocation();

  const uploadButton =
    location.pathname != "/infolomba/upload" ? (
      matchesssm ? (
        <Button
          size="md"
          aria-label="Upload Competition"
          radius="md"
          leftSection={<IconUpload size={20} stroke={2} />}
          component="a"
          href="/infolomba/upload"
        >
          <Text>Upload Lomba</Text>
        </Button>
      ) : (
        <ActionIcon
          size="xl"
          aria-label="Upload Competition"
          radius="md"
          component="a"
          href="/infolomba/upload"
        >
          <IconUpload />
        </ActionIcon>
      )
    ) : null;
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
