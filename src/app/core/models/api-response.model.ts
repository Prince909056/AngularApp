import { IError } from './error.model';
import { IPagination } from './pagination.model';

export interface IApiResponse<T> {
  data: T;
  isSuccess: boolean;
  statusCode: number;
  message: string;
  errors: IError[];
  pagination?: IPagination;
}
