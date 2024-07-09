import { useLoaderData } from "react-router-dom";

import { Container, Grid, Text } from "@mantine/core";
import { Competition } from "./_interface";

import { DescSec } from "components/InfoLomba/Detail/DescSec";
import { Header } from "components/InfoLomba/Detail/Header";
import { ImageSec } from "components/InfoLomba/Detail/ImageSec";
import { Tail } from "components/InfoLomba/Detail/Tail";

export default function Detail() {
  const data = useLoaderData() as Competition;
  return (
    <>
      <Container size="xl" py="xl" >
        <Grid justify="center" align="center">
          <Grid.Col span={12}>
            <Text
              className="text-5xl"
              ta="center"
              fw={900}
              pb="sm"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {data.name}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 10, lg: 12 }}>
            <Header
              organizer={data.organizer}
              deadline={data.deadline}
              category={data.category}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <ImageSec image={data.image} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <DescSec description={data.description} />
          </Grid.Col>
          <Grid.Col span={{ base: 6, lg: 12 }}>
            <Tail url={data.url} />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
