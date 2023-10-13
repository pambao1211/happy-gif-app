import {
  Box,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";

import { fetchGIFResult } from "../../apis";
import { IGif } from "../../types/IGif.ts";
import GifList from "./GifList.tsx";

const Home = () => {
  const [term, setTerm] = useState("");
  const [isLoading, setIsIsLoading] = useState(false);
  const [gifs, setGifs] = useState<IGif[]>([]);
  const currentOffset = useRef(0);
  const hasMoreItem = useRef(true);

  const handleLoadMore = async () => {
    setIsIsLoading(true);
    if (!hasMoreItem.current) {
      setIsIsLoading(false);
      return;
    }
    const result = await fetchGIFResult(term, currentOffset.current);
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

  useEffect(() => {
    if (!term) return;
    const timerId = setTimeout(async () => {
      setIsIsLoading(true);
      await handleSearchTerm();
      setIsIsLoading(false);
    }, 500);
    return () => clearTimeout(timerId);
  }, [term]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentOffset.current = 0;
    hasMoreItem.current = false;
    setTerm(e.target.value);
    setGifs([]);
  };

  return (
    <Box w="80%">
      <InputGroup mb={10}>
        <InputLeftElement>
          {isLoading ? <Spinner /> : <SearchIcon />}
        </InputLeftElement>
        <Input
          placeholder="Search for GIFs"
          value={term}
          onChange={handleSearchTermChange}
        />
      </InputGroup>
      <Divider mb={10} />
      <GifList
        gifs={gifs}
        handleLoadMore={handleLoadMore}
        hasMore={hasMoreItem}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Home;
