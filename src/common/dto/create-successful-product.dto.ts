import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSuccessfulProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
