import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export function InstagramInput() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      urlIG: "",
    },

    validate: {
      urlIG: (value) =>
        /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(p)\/([^/?#&]+)).*/g.test(value)
          ? null
          : "Invalid Instagram post URL",
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)} style={{ width: "100%" }}>
      <Group w={"100%"}>
        <TextInput
          label="Impor Instagram Post"
          description="Impor Lomba dari Postingan Instagram"
          placeholder="https://www.instagram.com/p/..."
          w={"100%"}
          key={form.key("urlIG")}
          {...form.getInputProps("urlIG")}
        />
        <Button type="submit">Impor</Button>
      </Group>
    </form>
  );
}
