import GifList from "./GifList.tsx";
import React from "react";
import { IGif } from "../../types/IGif.ts";

interface Props {
  gifs: IGif[];
  handleLoadMore: () => Promise<void>;
  hasMoreItem: React.MutableRefObject<boolean>;
  isLoading: boolean;
}
const TabTrending: React.FC<Props> = ({
  gifs,
  handleLoadMore,
  hasMoreItem,
  isLoading,
}) => {
  return (
    <GifList
      gifs={gifs}
      handleLoadMore={handleLoadMore}
      hasMore={hasMoreItem}
      isLoading={isLoading}
    />
  );
};

export default TabTrending;
