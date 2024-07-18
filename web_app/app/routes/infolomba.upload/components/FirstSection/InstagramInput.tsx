import { Alert, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Turnstile } from "@marsidev/react-turnstile";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { IconInfoCircle } from "@tabler/icons-react";
import { GeminiResponse } from "~/types/infolomba";
import { useCompetitonFormContext } from "../../formContext";
import { handleGeminiForm } from "../../importAction";
import { loader } from "../../loader";

export function InstagramInput({ nextStep }: { nextStep: () => void }) {
  const form = useCompetitonFormContext();
  const loadd = useLoaderData<typeof loader>();
  const [loading, { open, close }] = useDisclosure(false);
  const [captcha, setCaptcha] = useState("");
  const [failed, setFailed] = useState(false);
  const form_ig = useForm({
    mode: "uncontrolled",
    initialValues: {
      urlIG: "",
    },

    validate: {
      urlIG: (value) =>
        /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(p)\/([^/?#&]+)).*/g.test(
          value,
        )
          ? null
          : "Invalid Instagram post URL",
    },
  });

  const handleFormSubmit = async ({ urlIG }: { urlIG: string }) => {
    open();
    try {
      const response = await handleGeminiForm(urlIG, loadd.endpoint, captcha);
      const data_import = response.data as GeminiResponse;
      let datee: Date;
      if (data_import.data?.deadline) {
        datee = new Date(data_import.data.deadline);
      } else {
        datee = new Date();
      }
      form.setValues({
        name: data_import.data?.name,
        description: data_import.data?.description,
        organizer: data_import.data?.organizer,
        url: data_import.data?.url,
        deadline: datee,
        img_url: data_import.data?.url_image,
      });
      nextStep();
    } catch (error) {
      close();
      setFailed(true);
    }
  };

  return (
    <Form
      style={{ width: "100%" }}
      method="post"
      onSubmit={form_ig.onSubmit(handleFormSubmit)}
    >
      <Group>
        {failed && (
          <Alert
            variant="light"
            color="red"
            title="Oops.. Something went wrong. "
            icon={<IconInfoCircle />}
          >
            Please try again or open an issue at{" "}
            <a href="https://github.com/hilmoo/project-mo/issues/new">
              https://github.com/hilmoo/project-mo/issues/new
            </a>
          </Alert>
        )}
        <TextInput
          label="Impor Instagram Post"
          description="Impor Lomba dari Postingan Instagram"
          placeholder="https://www.instagram.com/p/..."
          w={"100%"}
          key={form_ig.key("urlIG")}
          {...form_ig.getInputProps("urlIG")}
        />
        <Button
          loading={loading}
          loaderProps={{ type: "dots" }}
          type="submit"
          disabled={!captcha}
        >
          Impor
        </Button>
        <Turnstile
          siteKey={loadd.turnstile}
          onSuccess={setCaptcha}
          onExpire={() => setCaptcha("")}
          options={{ appearance: "always" }}
        />
      </Group>
    </Form>
  );
}
