import { ActionIcon, Anchor, Container, Group, rem } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { MoLogo } from "~/components/MoLogo/MoLogo";
import classes from "./Footer.module.css";
import { Link } from "@remix-run/react";

const links = [
  { link: "https://github.com/hilmoo/virramat-project", label: "Source Code" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container size="xl">
        <div className={classes.inner}>
          <Link to="/">
            <MoLogo size={28} />
          </Link>

          <Group className={classes.links}>{items}</Group>

          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <ActionIcon
              size="lg"
              variant="default"
              radius="xl"
              component="a"
              href="https://github.com/hilmoo"
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
