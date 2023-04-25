import { Metadata } from '../interfaces';

export class PaginationResult<T> {
  rows: T[];
  metadata: Metadata;
}
