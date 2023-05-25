import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BrowseChannel } from 'shared/domains/channels/models/browse-channel/browse-channel.model';
import { PaginationMeta } from 'shared/domains/channels/models/browse-channel/pagination-meta.model';

export class BrowseChannelPagination {
  @ValidateNested({ each: true })
  @Type(() => BrowseChannel)
  items!: BrowseChannel[];

  @ValidateNested()
  @Type(() => PaginationMeta)
  meta!: PaginationMeta;
}
