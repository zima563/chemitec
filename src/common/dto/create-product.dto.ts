import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsEnum,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export enum ProductTypeEnum {
  BtoB = 'BtoB',
  BtoC = 'BtoC',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsNumber()
  price: number;

  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @IsOptional()
  brandId?: number;

  @IsOptional()
  industryId?: number;

  // الصور الإضافية كـ array من الستركتشر
  @IsOptional()
  @IsArray()
  images?: { url: string }[];
}
