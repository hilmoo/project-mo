import {
  Button,
  Card,
  Container,
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

import GridPatternProps from "components/animateUI/GridBG.tsx";
import TypingAnimation from "components/animateUI/typingAnimation";

function Root() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <>
      <GridPatternProps />
      <Container className="pt-20">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="items-center gap-10"
        >
          <TypingAnimation
            text="Hello World"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-center text-7xl font-extrabold text-transparent"
          />
          <Group>
            <Link to="infolomba">
              <Button variant="light" size="xl" radius="xl">
                Info Lomba
              </Button>
            </Link>
          </Group>
          <Group>
            <Button onClick={() => setColorScheme("light")}>Light</Button>
            <Button onClick={() => setColorScheme("dark")}>Dark</Button>
            <Button onClick={() => setColorScheme("auto")}>Auto</Button>
          </Group>
        </Card>
      </Container>
    </>
  );
}

export default Root;
