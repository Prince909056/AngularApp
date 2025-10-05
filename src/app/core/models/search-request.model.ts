export interface ISearchRequest {
  globalSearch: string;
  search: string;
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortOrder: number;
  fileType: string;
}
