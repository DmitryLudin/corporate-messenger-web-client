import { IsString } from 'class-validator';

export interface INamespace {
  id: string;
  name: string;
  displayName: string;
}

export class Namespace implements INamespace {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  displayName!: string;
}
