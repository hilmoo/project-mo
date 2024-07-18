import { Stack, Textarea, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

import { useCompetitonFormContext } from "../../formContext";
import { Category } from "./Category";

export function SecondSection() {
  const form = useCompetitonFormContext();
  return (
    <Stack py="xl">
      <TextInput
        withAsterisk
        label="Nama Lomba"
        placeholder="Find IT"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        label="Nama Penyelenggara"
        placeholder="Universitas Gadjah Mada"
        key={form.key("organizer")}
        {...form.getInputProps("organizer")}
      />
      <DateTimePicker
        valueFormat="DD MMM YYYY HH:mm"
        withAsterisk
        label="Deadline Pendaftaran"
        placeholder="Pilih tanggal dan waktu"
        minDate={new Date()}
        key={form.key("deadline")}
        {...form.getInputProps("deadline")}
      />
      <TextInput
        withAsterisk
        label="Link Pendaftaran"
        placeholder="https://nightlogin.id"
        key={form.key("url")}
        {...form.getInputProps("url")}
      />
      <Category />
      <Textarea
        withAsterisk
        label="Deskripsi Lomba"
        placeholder="Tulis deskripsi lomba di sini"
        autosize
        minRows={5}
        maxRows={10}
        key={form.key("description")}
        {...form.getInputProps("description")}
      />
    </Stack>
  );
}
