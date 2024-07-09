import { AspectRatio, Center, Image } from "@mantine/core";

export function ImageSec({ image }: { image: string }) {
  return (
    <Center>
      <AspectRatio maw={700}>
        <Image radius="md" fit="contain" src={image} />
      </AspectRatio>
    </Center>
  );
}
