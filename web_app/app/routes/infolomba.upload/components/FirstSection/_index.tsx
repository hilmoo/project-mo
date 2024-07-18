import { Flex } from "@mantine/core";

import { DropZone } from "./DropZone";
import { InstagramInput } from "./InstagramInput";
import classes from "./_index.module.css";

export function FirstSection({ nextStep }: { nextStep: () => void }) {
  return (
    <>
      <Flex
        mih={50}
        gap="xl"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        py="xl"
      >
        <DropZone nextStep={nextStep} />
        <div className={classes.divider}>atau</div>
        <InstagramInput nextStep={nextStep} />
      </Flex>
    </>
  );
}
