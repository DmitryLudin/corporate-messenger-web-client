import { IsOptional, IsString } from 'class-validator';

export interface IUser {
  id: string;
  username: string;
  displayName?: string | null;
  name: string;
}

export class User implements IUser {
  @IsString()
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  @IsOptional()
  displayName?: string | null;

  get name() {
    return this.displayName || this.username;
  }
}
