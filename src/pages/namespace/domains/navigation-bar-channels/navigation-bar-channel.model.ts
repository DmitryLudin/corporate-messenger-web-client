import { IsBoolean } from 'class-validator';
import { Channel } from 'shared/domains/channels/models/channel.model';
import 'reflect-metadata';

export class NavigationBarChannel extends Channel {
  @IsBoolean()
  isUnread!: boolean;

  constructor(partial: Partial<NavigationBarChannel>) {
    super();
    Object.assign(this, partial);
  }
}
