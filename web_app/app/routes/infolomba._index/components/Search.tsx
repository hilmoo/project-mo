import { ActionIcon, rem, TextInput, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

export function Search({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  const theme = useMantineTheme();
  const matchesssm = useMediaQuery("(min-width: 22em)");

  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Cari Lomba"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        matchesssm && (
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            aria-label="search"
          >
            <IconArrowRight
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        )
      }
    />
  );
}
