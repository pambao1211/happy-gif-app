import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import GifList from "./GifList.tsx";
import React from "react";
import { IGif } from "../../types/IGif.ts";

interface Props {
  isLoading: boolean;
  term: string;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gifs: IGif[];
  hasMoreItem: React.MutableRefObject<boolean>;
  handleLoadMore: () => Promise<void>;
}
const TabSearch: React.FC<Props> = ({
  isLoading,
  term,
  handleSearchTermChange,
  gifs,
  hasMoreItem,
  handleLoadMore,
}) => {
  return (
    <>
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
      <GifList
        gifs={gifs}
        handleLoadMore={handleLoadMore}
        hasMore={hasMoreItem}
        isLoading={isLoading}
      />
    </>
  );
};

export default TabSearch;
