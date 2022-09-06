import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class spendDTO {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  fullDate: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
