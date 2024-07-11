import {
  ActionIcon,
  Combobox,
  Group,
  Input,
  InputBase,
  useCombobox,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowsSort } from "@tabler/icons-react";
import { useState } from "react";
import classes from "./Sort.module.css";

const sorts = [
  "Deadline Terdekat",
  "Deadline Terjauh",
  "Paling Baru",
  "Paling Lama",
];

export function Sort({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });

  const [value, setValue] = useState<string>("Deadline Terdekat");
  const matcheslg = useMediaQuery("(min-width: 75em)");

  const options = sorts.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
      active={item === value}
      className={`rounded-none ${item === value ? classes.selectedBorder : ""}`}
    >
      <Group gap="xs">
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  const trigger = matcheslg ? (
    <InputBase
      size="md"
      component="button"
      type="button"
      pointer
      rightSection={<Combobox.Chevron />}
      rightSectionPointerEvents="none"
      onClick={() => {
        combobox.toggleDropdown();
      }}
      value={sortOrder}
    >
      {value || <Input.Placeholder>Urutkan</Input.Placeholder>}
    </InputBase>
  ) : (
    <ActionIcon
      variant="default"
      size="xl"
      type="button"
      onClick={() => {
        combobox.toggleDropdown();
      }}
    >
      <IconArrowsSort stroke={1.5} />
    </ActionIcon>
  );

  return (
    <Combobox
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.updateSelectedOptionIndex("active");
        setSortOrder(val);
      }}
      width={202}
    >
      <Combobox.Target targetType="button">{trigger}</Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
