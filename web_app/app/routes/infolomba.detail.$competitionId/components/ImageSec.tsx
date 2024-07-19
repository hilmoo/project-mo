import { AspectRatio, Center, Image } from "@mantine/core";

export function ImageSec({ image }: { image: string }) {
  return (
    <Center>
      <AspectRatio ratio={1080 / 1350} maw={{ base: 600, md: 700, lg: 1080 }}>
        <Image radius="md" fit="contain" src={image} alt="poster lomba"/>
      </AspectRatio>
    </Center>
  );
}
