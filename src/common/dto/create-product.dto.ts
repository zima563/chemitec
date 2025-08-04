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
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'أسمنت ممتاز',
    description: 'اسم المنتج بالعربي',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Ciment Premium',
    description: 'Nom du produit en français',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nameFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'High quality cement suitable for all construction works.',
    description: 'Product description in English (optional)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'أسمنت عالي الجودة مناسب لجميع أعمال البناء.',
    description: 'وصف المنتج بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example:
      'Ciment de haute qualité adapté à tous les travaux de construction.',
    description: 'Description du produit en français (facultatif)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionFr?: string;

  @ApiProperty({
    type: 'number',
    example: 500,
    description: 'Product price',
  })
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    enum: ProductTypeEnum,
    example: ProductTypeEnum.BtoB,
    description: 'Product type (BtoB or BtoC)',
  })
  @IsEnum(ProductTypeEnum)
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
  @IsArray()
  images?: any; // لازم any أو Express.Multer.File[]
}
