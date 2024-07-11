import { Accordion, Image } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useState } from "react";
import { useCompetitonFormContext } from "../../formContext";

export function ThirdSection() {
  const form = useCompetitonFormContext();
  const [files] = useState<FileWithPath[]>(form.getValues().image);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const dataPreview = [
    {
      key: "Nama Lomba",
      value: form.getValues().name,
    },
    {
      key: "Penyelenggara",
      value: form.getValues().organizer,
    },
    {
      key: "Deadline",
      value: form.getValues().deadline.toString(),
    },
    {
      key: "Link",
      value: form.getValues().url,
    },
    {
      key: "Deskripsi",
      value: form.getValues().description,
    },
    {
      key: "Kategori",
      value: form.getValues().category.join(", "),
    },
    {
      key: "Preview Poster",
      value: previews,
    },
  ];

  const items = dataPreview.map((item) => (
    <Accordion.Item key={item.key} value={item.key}>
      <Accordion.Control>{item.key}</Accordion.Control>
      <Accordion.Panel>{item.value}</Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion defaultValue={"Nama Lomba"}>{items}</Accordion>;
}
