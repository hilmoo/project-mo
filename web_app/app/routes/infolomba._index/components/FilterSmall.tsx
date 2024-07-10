import { ActionIcon } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

export function FilterSmall({ open }: { open: () => void }) {
  return (
    <ActionIcon variant="default" size="xl" type="button" onClick={open}>
      <IconAdjustmentsHorizontal stroke={1.5} />
    </ActionIcon>
  );
}
