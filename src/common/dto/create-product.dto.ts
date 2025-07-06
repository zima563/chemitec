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
    description: 'اسم المنتج',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'High quality cement suitable for all construction works.',
    description: 'وصف المنتج (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    type: 'number',
    example: 500,
    description: 'سعر المنتج',
  })
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    enum: ProductTypeEnum,
    example: ProductTypeEnum.BtoB,
    description: 'نوع المنتج (BtoB أو BtoC)',
  })
  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @ApiPropertyOptional({
    type: 'number',
    example: 1,
    description: 'ID البراند (اختياري)',
  })
  @IsOptional()
  @Type(() => Number)
  brandId?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 2,
    description: 'ID الصناعة (اختياري)',
  })
  @IsOptional()
  @Type(() => Number)
  industryId?: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'صورة الغلاف (Cover Image)',
    required: false,
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'صور إضافية للمنتج (يمكن رفع أكثر من صورة)',
    required: false,
  })
  @IsOptional()
  @IsArray()
  images?: any; // لازم any أو Express.Multer.File[]
}
