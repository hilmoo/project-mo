import { Alert, Button, Container, Group, Stack, Stepper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Turnstile } from "@marsidev/react-turnstile";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { CompetitionForm } from "types/infolomba";
import { FirstSection } from "./components/FirstSection/_index";
import { SecondSection } from "./components/SecondSection/_index";
import { ThirdSection } from "./components/ThirdSection/_index";
import { CompetitonFormProvider, useCompetitonForm } from "./formContext";

import { IconInfoCircle } from "@tabler/icons-react";
import { CompleteSection } from "./completeSection";
import { handleForm } from "./formAction";
import { loader, loader as uploadLoader } from "./loader";
import { meta as uploadMeta } from "./meta";
export { uploadLoader as loader, uploadMeta as meta };

export default function Upload() {
  const loadd = useLoaderData<typeof loader>();
  const [active, setActive] = useState(0);
  const [loading, { open, close }] = useDisclosure(false);
  const [captcha, setCaptcha] = useState("");
  const [failed, setFailed] = useState(false);
  const form = useCompetitonForm({
    mode: "uncontrolled",
    name: "competitionForm",
    initialValues: {
      name: "",
      organizer: "",
      deadline: new Date(),
      url: "",
      description: "",
      image: [],
      category: [],
      img_url: "",
    },
    validate: (values) => {
      const imageError =
        values.image?.length === 0 && values.img_url?.trim().length === 0
          ? "Input gambar atau impor melalui Instagram"
          : null;
      const nameError =
        values.name.trim().length == 0 ? "Nama Lomba diperlukan" : null;
      const organizerError =
        values.organizer.trim().length == 0
          ? "Nama Penyelenggara diperlukan"
          : null;
      const deadlineError = values.deadline
        ? null
        : "Deadline Pendaftaran diperlukan";
      const urlError =
        values.url.trim().length == 0 ? "Link Pendaftaran diperlukan" : null;
      const descriptionError =
        values.description.trim().length == 0
          ? "Deskripsi Lomba diperlukan"
          : null;
      const categoryError =
        values.category.length > 0 ? null : "Kategori Lomba diperlukan";

      if (active === 0) {
        return { image: imageError };
      }

      if (active === 1) {
        return {
          name: nameError,
          organizer: organizerError,
          deadline: deadlineError,
          url: urlError,
          description: descriptionError,
          category: categoryError,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const handleFormSubmit = async (values: CompetitionForm) => {
    open();
    try {
      await handleForm(values, loadd.endpoint, captcha);
      nextStep();
      setFailed(true);
    } catch (error) {
      close();
      setFailed(true);
    }
  };

  return (
    <Container pt="xl" mih={"80vh"} size="sm">
      <CompetitonFormProvider form={form}>
        <Stepper active={active} size="sm">
          <Stepper.Step>
            <FirstSection nextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step>
            <SecondSection />
          </Stepper.Step>
          <Stepper.Step>
            <ThirdSection />
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
          </Stepper.Step>
          <Stepper.Completed>
            <CompleteSection />
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          {active === 1 && <Button onClick={nextStep}>Next</Button>}
          {active === 2 && (
            <Form method="post" onSubmit={form.onSubmit(handleFormSubmit)}>
              <Stack>
                <Turnstile
                  siteKey={loadd.turnstile}
                  onSuccess={setCaptcha}
                  onExpire={() => setCaptcha("")}
                />
                <Button
                  loading={loading}
                  loaderProps={{ type: "dots" }}
                  type="submit"
                  disabled={!captcha}
                >
                  Upload
                </Button>
              </Stack>
            </Form>
          )}
        </Group>
      </CompetitonFormProvider>
    </Container>
  );
}
