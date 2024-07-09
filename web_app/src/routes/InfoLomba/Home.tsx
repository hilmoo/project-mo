import { Container, Grid, SimpleGrid } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { sort } from "fast-sort";
import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { CardLomba } from "@/components/InfoLomba/Home/Card";
import { FilterSmall } from "@/components/InfoLomba/Home/FilterSmall";
import { Filter } from "components/InfoLomba/Home/Filter";
import { Search } from "components/InfoLomba/Home/Search";
import { Sort } from "components/InfoLomba/Home/Sort";
import { CompetitionArray } from "./_interface";

export default function InfoLomba() {
  const data = useLoaderData() as CompetitionArray;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Paling Baru");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(data);
  const [opened, { open, close }] = useDisclosure(false);
  const matcheslg = useMediaQuery("(min-width: 75em)");

  useEffect(() => {
    let results = data;

    if (searchTerm) {
      results = matchSorter(results, searchTerm, {
        keys: ["name"],
      });
    }

    if (selectedCategories.length > 0) {
      selectedCategories.forEach((category) => {
        results = matchSorter(results, category, {
          keys: ["category"],
        });
      });
    }

    switch (sortOrder) {
      case "Deadline Terdekat":
        results = sort(results).asc((x) => new Date(x.deadline));
        break;
      case "Deadline Terjauh":
        results = sort(results).desc((x) => new Date(x.deadline));
        break;
      case "Paling Baru":
        results = sort(results).asc((x) => x.id);
        break;
      case "Paling Lama":
        results = sort(results).desc((x) => x.id);
        break;
    }
    setFilteredData(results);
  }, [data, searchTerm, selectedCategories, sortOrder]);

  const cards = filteredData.map((item) => (
    <CardLomba
      id={item.id}
      key={item.id}
      image={item.image}
      name={item.name}
      organizer={item.organizer}
      category={item.category}
      deadline={item.deadline}
    />
  ));

  return (
    <>
      <Container size="xl" py="md">
        <Grid gutter="xs">
          <Grid.Col span="auto">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Grid.Col>
          <Grid.Col span={{ base: "content", lg: 2 }}>
            <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </Grid.Col>
          <Grid.Col span="content" hidden={matcheslg && true}>
            {matcheslg ? null : <FilterSmall open={open} />}
          </Grid.Col>
        </Grid>
      </Container>
      <Container size="xxl" maw={2000}>
        <Grid>
          <Grid.Col span="content">
            <Filter
              filterItem={selectedCategories}
              setFilterItem={setSelectedCategories}
              opened={opened}
              close={close}
            />
          </Grid.Col>
          <Grid.Col span="auto">
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
              spacing="xs"
              verticalSpacing="xs"
            >
              {cards}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
