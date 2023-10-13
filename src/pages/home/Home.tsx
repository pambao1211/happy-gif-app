import {
  Box,
  Flex,
  Icon,
  SlideFade,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { fetchGIFResult, fetchGIFTrendingResult } from "../../apis";
import { IGif } from "../../types/IGif.ts";
import TabSearch from "./TabSearch.tsx";
import TabTrending from "./TabTrending.tsx";
import { BiTrendingUp } from "react-icons/bi";
import {AiOutlineSearch} from "react-icons/ai";

const Home = () => {
  const [term, setTerm] = useState("");
  const [isLoading, setIsIsLoading] = useState(false);
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [isTrending, setIsTrending] = useState(true);
  const currentOffset = useRef(0);
  const hasMoreItem = useRef(true);

  const handleLoadMore = async () => {
    setIsIsLoading(true);
    if (!hasMoreItem.current) {
      setIsIsLoading(false);
      return;
    }

    const result = isTrending
      ? await fetchGIFTrendingResult(currentOffset.current)
      : await fetchGIFResult(term, currentOffset.current);
    console.log(result);
    if (!result.data.length) {
      hasMoreItem.current = false;
      setIsIsLoading(false);
      return;
    }
    currentOffset.current += result.data.length;
    if (gifs.length + result.data.length >= result.pagination.total_count)
      hasMoreItem.current = false;
    setGifs((pre) => [...pre, ...result.data]);
    setIsIsLoading(false);
  };

  const handleSearchTerm = async () => {
    const result = await fetchGIFResult(term, currentOffset.current);
    setGifs(result.data);
    currentOffset.current = result.data.length;
    if (
      !result.data.length ||
      result.data.length >= result.pagination.total_count
    )
      hasMoreItem.current = false;
    else hasMoreItem.current = true;
  };

  const reset = () => {
    currentOffset.current = 0;
    hasMoreItem.current = false;
    setTerm("");
    setGifs([]);
  };

  useEffect(() => {
    if (!term) return;
    const timerId = setTimeout(async () => {
      setIsIsLoading(true);
      await handleSearchTerm();
      setIsIsLoading(false);
    }, 500);
    return () => clearTimeout(timerId);
  }, [term]);

  useEffect(() => {
    const handler = async () => {
      reset();
      if (isTrending) {
        hasMoreItem.current = true;
        await handleLoadMore();
      }
    };
    void handler();
  }, [isTrending]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    setTerm(e.target.value);
  };

  return (
    <Tabs display="flex" alignItems="center" flexDir="column" w="100%">
      <TabList mb={5} display="flex" justifyContent="center" w="80%">
        <Tab onClick={() => setIsTrending(true)}>
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Icon boxSize={5} as={BiTrendingUp} />
            <Box>Trending</Box>
          </Flex>
        </Tab>
        <Tab onClick={() => setIsTrending(false)}>
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Icon boxSize={5} as={AiOutlineSearch} />
            <Box>Search GIFs</Box>
          </Flex>
        </Tab>
      </TabList>
      <TabPanels display="flex" flexDir="column" alignItems="center" w="100%">
        <TabPanel w="80%">
          <SlideFade in={isTrending}>
            <TabTrending
              gifs={gifs}
              handleLoadMore={handleLoadMore}
              hasMoreItem={hasMoreItem}
              isLoading={isLoading}
            />
          </SlideFade>
        </TabPanel>
        <TabPanel w="80%">
          <SlideFade in={!isTrending}>
            <TabSearch
              isLoading={isLoading}
              term={term}
              handleSearchTermChange={handleSearchTermChange}
              gifs={gifs}
              handleLoadMore={handleLoadMore}
              hasMoreItem={hasMoreItem}
            />
          </SlideFade>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Home;
