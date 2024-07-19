import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { matchSorter } from "match-sorter";
import { useState } from "react";

import { useLoaderData } from "@remix-run/react";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import { loader } from "../loader";
import classes from "./Filter.module.css";

function Search({ onChange }: { onChange: (value: string) => void }) {
  const icon = <IconSearch stroke={1.5} />;
  return (
    <TextInput
      placeholder="Cari Kategori Lomba"
      size="md"
      className="pb-5"
      rightSection={icon}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}

export function Filter({
  filterItem,
  setFilterItem,
  opened,
  close,
}: {
  filterItem: string[];
  setFilterItem: (item: string[]) => void;
  opened: boolean;
  close: () => void;
}) {
  const { categoryArray } = useLoaderData<typeof loader>();
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredData = matchSorter(categoryArray, searchValue, { keys: ["name"] });
  const matcheslg = useMediaQuery("(min-width: 75em)");

  const category = filteredData.map((item) => (
    <Checkbox.Card
      key={item.id}
      value={item.name}
      radius="md"
      className={classes.card}
    >
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
        </div>
      </Group>
    </Checkbox.Card>
  ));

  const content = (
    <>
      <Search onChange={setSearchValue} />
      <Checkbox.Group
        value={filterItem}
        onChange={(c) => {
          setFilterItem(c);
        }}
      >
        <Stack gap="xs">{category}</Stack>
      </Checkbox.Group>
    </>
  );

  return matcheslg ? (
    <Box className={classes.boxx}>
      <Group className={classes.header}>
        <IconAdjustmentsHorizontal stroke={1} />
        Filter Lomba
      </Group>
      {content}
    </Box>
  ) : (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      radius={0}
      transitionProps={{ transition: "fade", duration: 200 }}
      withCloseButton={false}
    >
      <Modal.Header>
        <Modal.Title>
          <Group>
            <IconAdjustmentsHorizontal stroke={1} />
            Filter Lomba
          </Group>
        </Modal.Title>
        <Button onClick={close}>Terapkan FIlter</Button>
      </Modal.Header>
      {content}
    </Modal>
  );
}
