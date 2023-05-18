import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Channel {
  @IsString()
  id!: string;

  @IsString()
  namespaceId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsDate()
  updatedAt!: Date;

  @IsDate()
  createdAt!: Date;

  @IsBoolean()
  isUnread!: boolean;

  @IsNumber()
  membersCount!: number;

  getName() {
    return this.displayName || this.name;
  }
}
