import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { BasePagination } from 'shared/domains/pagination';

import { ChannelMessageModel } from '../models';

export class ChannelMessagePaginationModel extends BasePagination {
  @ValidateNested({ each: true })
  @Type(() => ChannelMessageModel)
  items!: ChannelMessageModel[];
}
