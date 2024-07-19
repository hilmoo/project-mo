import { Container, Grid, SimpleGrid } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Await, useLoaderData } from "@remix-run/react";
import { sort } from "fast-sort";
import { matchSorter } from "match-sorter";
import { Suspense, useEffect, useState } from "react";

import { CardLomba } from "./components/Card";
import { Filter } from "./components/Filter";
import { FilterSmall } from "./components/FilterSmall";
import { Search } from "./components/Search";
import { Sort } from "./components/Sort";
import classes from "./index.module.css";

import { JSX } from "react/jsx-runtime";
import { CompetitionSimple } from "~/types/infolomba";
import { loader as homeLoader, loader } from "./loader";
import { meta as homeMeta } from "./meta";
export { homeLoader as loader, homeMeta as meta };

export default function InfoLomba() {
  const { competition } = useLoaderData<typeof loader>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(competition);
  const [opened, { open, close }] = useDisclosure(false);
  const matcheslg = useMediaQuery("(min-width: 75em)");

  useEffect(() => {
    let results = competition;

    if (searchTerm) {
      results = matchSorter(results, searchTerm, {
        keys: ["name"],
      });
    }

    if (selectedCategories.length > 0) {
      selectedCategories.forEach((category) => {
        results = matchSorter(results, category, {
          keys: ["category.*.name"],
        });
      });
    }

    if (sortOrder === "Deadline Terdekat") {
      results = sort(results).asc((x) => x.deadline);
    } else if (sortOrder === "Deadline Terjauh") {
      results = sort(results).desc((x) => x.deadline);
    } else if (sortOrder === "Paling Baru") {
      results = sort(results).desc((x) => x.upload_date);
    } else if (sortOrder === "Paling Lama") {
      results = sort(results).asc((x) => x.upload_date);
    } else {
      setSortOrder("Deadline Terdekat");
    }
    setFilteredData(results);
  }, [competition, searchTerm, selectedCategories, sortOrder]);

  const filterFull = matcheslg ? (
    <Grid.Col span="content">
      <Container className={classes.sidee}>
        <Filter
          filterItem={selectedCategories}
          setFilterItem={setSelectedCategories}
          opened={opened}
          close={close}
        />
      </Container>
    </Grid.Col>
  ) : (
    <Filter
      filterItem={selectedCategories}
      setFilterItem={setSelectedCategories}
      opened={opened}
      close={close}
    />
  );

  return (
    <>
      <Container fluid className={classes.headd} bg="var(--mantine-color-body)">
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
      </Container>
      <Container size="xxl" maw={2000}>
        <Grid>
          {filterFull}
          <Grid.Col span="auto">
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
              spacing="xs"
              verticalSpacing="xs"
            >
              <Suspense fallback={<div>Loading...</div>}>
                {filteredData.map(
                  (item: JSX.IntrinsicAttributes & CompetitionSimple) => (
                    <Await key={item.id} resolve={filteredData}>
                      <CardLomba key={item.id} {...item} />
                    </Await>
                  ),
                )}
              </Suspense>
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
