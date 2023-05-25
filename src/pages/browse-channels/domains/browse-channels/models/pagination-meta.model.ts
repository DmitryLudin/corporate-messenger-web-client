import { IsNumber } from 'class-validator';

export class PaginationMeta {
  @IsNumber()
  currentPage!: number;

  @IsNumber()
  itemCount!: number;

  @IsNumber()
  itemsPerPage!: number;

  @IsNumber()
  totalItems!: number;

  @IsNumber()
  totalPages!: number;
}
