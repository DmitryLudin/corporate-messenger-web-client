import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';
import { User } from 'shared/domains/user';

export class ChannelMessageModel {
  @IsString()
  id!: string;

  @IsString()
  text!: string;

  @ValidateNested()
  @Type(() => User)
  user!: User;

  @IsString()
  channelId!: string;

  @IsDate()
  updatedAt!: Date;

  @IsDate()
  createdAt!: Date;
}
