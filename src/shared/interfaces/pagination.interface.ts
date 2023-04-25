export interface PaginationParam {
  page: number;
  limit: number;
  isPaginate?: boolean;
}

export interface Metadata {
  page: number;
  totalPage: number;
  limit: number;
  total: number;
}
