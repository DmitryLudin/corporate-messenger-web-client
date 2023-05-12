import { IsArray } from 'class-validator';
import { User } from 'shared/domains/user/user.model';

export class Members {
  @IsArray()
  items!: User[];
  meta!: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}
