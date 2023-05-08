import { IsDate, IsOptional, IsString } from 'class-validator';

export interface IChannel {
  id: string;
  name: string;
  displayName?: string;
  namespaceId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Channel implements IChannel {
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

  getName() {
    return this.displayName || this.name;
  }
}
