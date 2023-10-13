import axios from "axios";
import { GIPHY_API_SEARCH, GIPHY_API_TRENDING } from "../constants";
import { GiphyResponse } from "../types/api-result/GiphyResponse.ts";
import { IGif } from "../types/IGif.ts";
import { IGIFResult } from "../types/IGIFResult.ts";

export const fetchGIFResult = async (
  searchTerm: string,
  offset: number
): Promise<IGIFResult> => {
  const result = await axios.get<GiphyResponse>(
    `${GIPHY_API_SEARCH}&q=${searchTerm}&offset=${offset}`
  );
  return {
    pagination: result.data.pagination,
    data: result.data.data.map(
      (d) =>
        ({
          ...d.images.fixed_height,
          title: d.title,
          username: d.username,
          rating: d.rating,
        }) as unknown as IGif
    ),
  };
};

export const fetchGIFTrendingResult = async (
  offset: number
): Promise<IGIFResult> => {
  const result = await axios.get<GiphyResponse>(
    `${GIPHY_API_TRENDING}&offset=${offset}`
  );
  return {
    pagination: result.data.pagination,
    data: result.data.data.map(
      (d) =>
        ({
          ...d.images.fixed_height,
          title: d.title,
          username: d.username,
          rating: d.rating,
        }) as unknown as IGif as unknown as IGif
    ),
  };
};
