import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Brand Name',
    description: 'Brand name in English',
  })
  @IsString({ message: 'English brand name must be a string.' })
  @IsNotEmpty({ message: 'English brand name is required.' })
  @MaxLength(100, {
    message: 'English brand name must not exceed 100 characters.',
  })
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'اسم البراند',
    description: 'اسم البراند بالعربي',
  })
  @IsString({ message: 'Arabic brand name must be a string.' })
  @IsNotEmpty({ message: 'Arabic brand name is required.' })
  @MaxLength(100, {
    message: 'Arabic brand name must not exceed 100 characters.',
  })
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Nom de la marque',
    description: 'Nom de la marque en français',
  })
  @IsString({ message: 'French brand name must be a string.' })
  @IsNotEmpty({ message: 'French brand name is required.' })
  @MaxLength(100, {
    message: 'French brand name must not exceed 100 characters.',
  })
  nameFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'Brand description',
    description: 'Brand description in English',
  })
  @IsOptional()
  @IsString({ message: 'English description must be a string.' })
  @MaxLength(1000, {
    message: 'English description must not exceed 500 characters.',
  })
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'وصف البراند',
    description: 'وصف البراند بالعربي',
  })
  @IsOptional()
  @IsString({ message: 'Arabic description must be a string.' })
  @MaxLength(1000, {
    message: 'Arabic description must not exceed 500 characters.',
  })
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'Description de la marque',
    description: 'Description de la marque en français',
  })
  @IsOptional()
  @IsString({ message: 'French description must be a string.' })
  @MaxLength(1000, {
    message: 'French description must not exceed 500 characters.',
  })
  descriptionFr?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Brand logo image',
    required: false,
  })
  @IsOptional()
  logo?: any;
}
