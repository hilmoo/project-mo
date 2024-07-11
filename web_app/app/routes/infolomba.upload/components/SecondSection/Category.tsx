import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { useState } from "react";

import { useCompetitonFormContext } from "../../formContext";

const category = [
  { id: 1, name: "Artificial Intelligence" },
  { id: 2, name: "Cyber Security" },
  { id: 3, name: "Web Development" },
  { id: 4, name: "Data Science" },
  { id: 5, name: "Design" },
  { id: 6, name: "Mobile Development" },
  { id: 7, name: "Game Development" },
];

export function Category() {
  const form = useCompetitonFormContext();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string[]>(form.getValues().category);

  const handleValueSelect = (val: string) =>
    setValue((current) => {
      const newValue = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];
      form.setFieldValue("category", newValue);
      return newValue;
    });

  const handleValueRemove = (val: string) =>
    setValue((current) => {
      const updatedValue = current.filter((v) => v !== val);
      form.setFieldValue("category", updatedValue);
      return updatedValue;
    });

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = category
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .map((item) => (
      <Combobox.Option
        value={item.name}
        key={item.id}
        active={value.includes(item.name)}
      >
        <Group gap="sm">
          {value.includes(item.name) ? <CheckIcon size={12} /> : null}
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput
          onClick={() => combobox.openDropdown()}
          label="Kategori Lomba"
          withAsterisk
          key={form.key("category")}
          {...form.getInputProps("category")}
        >
          <Pill.Group>
            {values}
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
