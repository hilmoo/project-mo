import { Alert, Center, Group, Text, rem } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconInfoCircle,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";

import { useCompetitonFormContext } from "../../formContext";

export function DropZone({ nextStep }: { nextStep: () => void }) {
  const form = useCompetitonFormContext();

  return (
    <>
      {form.errors.image && (
        <Alert
          variant="filled"
          color="red"
          w={"100%"}
          title="Terjadi Galat"
          icon={<IconInfoCircle />}
        >
          {form.errors.image}
        </Alert>
      )}
      <Dropzone
        onDrop={(files) => {
          form.setFieldValue("image", files);
          nextStep();
        }}
        onReject={() => form.setFieldError("image", "Gambar tidak valid")}
        maxSize={5 * 1024 ** 2}
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        w={"100%"}
        key={form.key("image")}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Tarik poster kesini atau klik untuk memilih file
            </Text>
            <Center>
              <Text size="sm" c="dimmed" inline mt={7}>
                (Maksimal 5MB, hanya menerima gambar PNG, JPG, JPEG)
              </Text>
            </Center>
          </div>
        </Group>
      </Dropzone>
    </>
  );
}
