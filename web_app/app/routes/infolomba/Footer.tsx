import { ActionIcon, Anchor, Container, Group, rem } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { MoLogo } from "~/components/MoLogo/MoLogo";
import classes from "./Footer.module.css";

const links = [
  { link: "https://github.com/hilmoo/project-mo", label: "Source Code" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      target="_blank"
      component="a"
      lh={1}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container size="xl">
        <div className={classes.inner}>
          <a href="/" aria-label="go to homepage">
            <MoLogo size={28} />
          </a>

          <Group className={classes.links}>{items}</Group>

          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <ActionIcon
              size="lg"
              variant="default"
              radius="xl"
              component="a"
              target="_blank"
              href="https://github.com/hilmoo"
              aria-label="Github Account"
            >
              <IconBrandGithub
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </div>
      </Container>
    </div>
  );
}
