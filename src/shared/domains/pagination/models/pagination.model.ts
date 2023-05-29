import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationMeta } from './pagination-meta.model';

export class BasePagination {
  @ValidateNested()
  @Type(() => PaginationMeta)
  meta!: PaginationMeta;
}
