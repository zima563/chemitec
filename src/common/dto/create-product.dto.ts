import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  brandId?: number;

  @IsOptional()
  @IsNumber()
  industryId?: number;
}
