import { Button, Container, Group, Stepper } from "@mantine/core";
import { Form } from "@remix-run/react";
import { useState } from "react";

import { FirstSection } from "./components/FirstSection/_index";
import { SecondSection } from "./components/SecondSection/_index";
import { ThirdSection } from "./components/ThirdSection/_index";
import { CompetitonFormProvider, useCompetitonForm } from "./formContext";

import { meta as uploadMeta } from "./meta";
export { uploadMeta as meta };

export default function Upload() {
  const [active, setActive] = useState(0);

  const form = useCompetitonForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      organizer: "",
      deadline: "",
      url: "",
      description: "",
      image: [],
      category: [],
    },
    validate: (values) => {
      const imageError =
        values.image.length == 0
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

  return (
    <Container py="xl" h={"80vh"} size="sm">
      {active === 3 && (
        <>
          Completed, click back button to get to previous step
          {JSON.stringify(form.getValues(), null, 2)}
        </>
      )}
      <CompetitonFormProvider form={form}>
        {active !== 3 && (
          <Stepper active={active} size="sm">
            <Stepper.Step>
              <FirstSection nextStep={nextStep} />
            </Stepper.Step>
            <Stepper.Step>
              <SecondSection />
            </Stepper.Step>
            <Stepper.Step>
              <ThirdSection />
            </Stepper.Step>
          </Stepper>
        )}

        <Group justify="center" mt="xl">
          {active === 1 && <Button onClick={nextStep}>Next</Button>}
          {active === 2 && (
            <Form method="post">
              <Button
                type="submit"
                name="uploadCompetition"
                value={JSON.stringify(form.getValues(), null, 2)}
              >
                Delete
              </Button>
            </Form>
          )}
        </Group>
      </CompetitonFormProvider>
    </Container>
  );
}
