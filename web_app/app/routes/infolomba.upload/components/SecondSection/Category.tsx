import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { useLoaderData } from "@remix-run/react";
import { sort } from "fast-sort";
import { useCompetitonFormContext } from "../../formContext";
import { loader } from "../../loader";

export function Category() {
  const loadd = useLoaderData<typeof loader>();
  const [categorys, setCategorys] = useState(loadd.categoryArray);
  useEffect(() => {
    let result = categorys;
    result = sort(result).asc((x) => x.name);
    setCategorys(result);
  }, [categorys]);
  const form = useCompetitonFormContext();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState(Array<string>());

  const handleValueSelect = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    setValue(newValue);
    form.setFieldValue("category", newValue);
  };

  const handleValueRemove = (val: string) => {
    setValue((current) => {
      const updatedValue = current.filter((v) => v !== val);
      return updatedValue;
    });
    form.setFieldValue(
      "category",
      value.filter((v) => v !== val),
    );
  };

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = categorys
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
