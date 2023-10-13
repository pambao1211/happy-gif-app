import React from "react";
import { IGif } from "../../types/IGif.ts";
import Gif from "../../common/Gif.tsx";
import SpinnerCustom from "../../common/SpinnerCustom.tsx";
import { Flex } from "@chakra-ui/react";
import Empty from "../../common/Empty.tsx";
import InfiniteScroll from "react-infinite-scroller";

interface Props {
  gifs: IGif[];
  isLoading: boolean;
  hasMore: React.MutableRefObject<boolean>;
  handleLoadMore: () => Promise<void>;
}
const GifList: React.FC<Props> = ({
  gifs,
  isLoading,
  hasMore,
  handleLoadMore,
}) => {
  const renderList = () => {
    if (!gifs.length)
      return <Empty msg="No result, please enter text to search!" />;
    return (
      <Flex w="100%" justify="center" wrap="wrap" gap={5}>
        {gifs.map((gif, index) => (
          <Gif gif={gif} key={index} />
        ))}
        {isLoading && <SpinnerCustom />}
      </Flex>
    );
  };
  return (
    <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore.current}>
      {isLoading && !gifs.length ? <SpinnerCustom /> : renderList()}
    </InfiniteScroll>
  );
};

export default GifList;
