import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { BasePagination } from 'shared/domains/pagination';

import { Channel } from '../models';

export class ChannelPagination extends BasePagination {
  @ValidateNested({ each: true })
  @Type(() => Channel)
  items!: Channel[];
}
