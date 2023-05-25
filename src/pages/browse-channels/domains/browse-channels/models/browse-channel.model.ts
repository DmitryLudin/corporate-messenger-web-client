import { IsBoolean, IsNumber } from 'class-validator';
import { Channel } from 'shared/domains/channels/models/channel.model';
import 'reflect-metadata';

export class BrowseChannel extends Channel {
  @IsBoolean()
  isMember!: boolean;

  @IsNumber()
  membersCount!: number;

  constructor(partial: Partial<BrowseChannel>) {
    super();
    Object.assign(this, partial);
  }
}
