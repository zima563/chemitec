import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateIndustryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
