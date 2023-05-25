import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BrowseChannel } from 'pages/browse-channels/domains/browse-channels/models/browse-channel.model';
import { PaginationMeta } from 'pages/browse-channels/domains/browse-channels/models/pagination-meta.model';

export class BrowseChannelPagination {
  @ValidateNested({ each: true })
  @Type(() => BrowseChannel)
  items!: BrowseChannel[];

  @ValidateNested()
  @Type(() => PaginationMeta)
  meta!: PaginationMeta;
}
