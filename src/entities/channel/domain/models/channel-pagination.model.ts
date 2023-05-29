import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { BasePagination } from 'shared/models';

import { Channel } from '../models';

export class ChannelPagination extends BasePagination {
  @ValidateNested({ each: true })
  @Type(() => Channel)
  items!: Channel[];
}
