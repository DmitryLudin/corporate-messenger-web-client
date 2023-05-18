import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { User } from 'shared/domains/user/user.model';
import 'reflect-metadata';

export class ChannelMembers {
  @ValidateNested({ each: true })
  @Type(() => User)
  items!: User[];
  meta!: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}
