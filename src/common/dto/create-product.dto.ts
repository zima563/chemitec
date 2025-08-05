import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum ProductTypeEnum {
  BtoB = 'BtoB',
  BtoC = 'BtoC',
}

export class CreateProductDto {
  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Premium Cement',
    description: 'Product name in English',
  })
  @IsString({ message: 'Product name (English) must be a string.' })
  @IsNotEmpty({ message: 'Product name (English) is required.' })
  @MaxLength(200, {
    message: 'Product name (English) must not exceed 200 characters.',
  })
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'أسمنت ممتاز',
    description: 'اسم المنتج بالعربي',
  })
  @IsString({ message: 'Product name (Arabic) must be a string.' })
  @IsNotEmpty({ message: 'اسم المنتج (بالعربي) مطلوب.' })
  @MaxLength(200, { message: 'اسم المنتج (بالعربي) يجب ألا يزيد عن 200 حرف.' })
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Ciment Premium',
    description: 'Nom du produit en français',
  })
  @IsString({ message: 'Product name (French) must be a string.' })
  @IsNotEmpty({ message: 'Nom du produit (FR) est requis.' })
  @MaxLength(200, {
    message: 'Nom du produit (FR) ne doit pas dépasser 200 caractères.',
  })
  nameFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'High quality cement suitable for all construction works.',
    description: 'Product description in English (optional)',
  })
  @IsOptional()
  @IsString({ message: 'Product description (English) must be a string.' })
  @MaxLength(1000, {
    message: 'Product description (English) must not exceed 1000 characters.',
  })
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'أسمنت عالي الجودة مناسب لجميع أعمال البناء.',
    description: 'وصف المنتج بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString({ message: 'وصف المنتج (بالعربي) لازم يكون نص.' })
  @MaxLength(1000, {
    message: 'وصف المنتج (بالعربي) يجب ألا يزيد عن 1000 حرف.',
  })
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example:
      'Ciment de haute qualité adapté à tous les travaux de construction.',
    description: 'Description du produit en français (facultatif)',
  })
  @IsOptional()
  @IsString({
    message: 'Description du produit (FR) doit être une chaîne de caractères.',
  })
  @MaxLength(1000, {
    message:
      'Description du produit (FR) ne doit pas dépasser 1000 caractères.',
  })
  descriptionFr?: string;

  @ApiProperty({
    type: 'number',
    example: 500,
    description: 'Product price',
  })
  @IsNumber({}, { message: 'Product price must be a number.' })
  @Type(() => Number)
  price: number;

  @ApiProperty({
    enum: ProductTypeEnum,
    example: ProductTypeEnum.BtoB,
    description: 'Product type (BtoB or BtoC)',
  })
  @IsEnum(ProductTypeEnum, {
    message: 'Product type must be either BtoB or BtoC.',
  })
  type: ProductTypeEnum;

  @ApiPropertyOptional({
    type: 'number',
    example: 1,
    description: 'Brand ID (optional)',
  })
  @IsOptional()
  @Type(() => Number)
  brandId?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 2,
    description: 'Industry ID (optional)',
  })
  @IsOptional()
  @Type(() => Number)
  industryId?: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Cover image (optional)',
    required: false,
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Additional product images (optional, multiple files)',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Additional images must be an array of files.' })
  images?: any;
}
