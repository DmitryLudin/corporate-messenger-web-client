import { IsNumber, IsOptional, IsString } from 'class-validator';

export interface IUser {
  id: number;
  username: string;
  displayName?: string | null;
  name: string;
}

export class User implements IUser {
  @IsNumber()
  id!: number;

  @IsString()
  username!: string;

  @IsString()
  @IsOptional()
  displayName?: string | null;

  get name() {
    return this.displayName || this.username;
  }
}
