import {IGif} from "./IGif.ts";
import {Pagination} from "./api-result/GiphySearch.ts";

export interface IGIFResult{
  data: IGif[],
  pagination: Pagination,
}
