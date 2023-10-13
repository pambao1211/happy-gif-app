import {IGif} from "./IGif.ts";
import {Pagination} from "./api-result/GiphyResponse.ts";

export interface IGIFResult{
  data: IGif[],
  pagination: Pagination,
}
