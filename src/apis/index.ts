import axios from "axios";
import { GIPHY_API_SEARCH } from "../constants";
import { GiphySearch } from "../types/api-result/GiphySearch.ts";
import { IGif } from "../types/IGif.ts";
import { IGIFResult } from "../types/IGIFResult.ts";

export const fetchGIFResult = async (
  searchTerm: string,
  offset: number,
): Promise<IGIFResult> => {
  const result = await axios.get<GiphySearch>(
    `${GIPHY_API_SEARCH}&q=${searchTerm}&offset=${offset}`
  );
  return {
    pagination: result.data.pagination,
    data: result.data.data.map((d) => d.images.fixed_height as unknown as IGif),
  };
};
