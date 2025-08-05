import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCertificateDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Certificate Name',
    description: 'Certificate name in English',
  })
  @IsString({ message: 'English certificate name must be a string.' })
  @IsNotEmpty({ message: 'English certificate name is required.' })
  @MaxLength(100, {
    message: 'English certificate name must not exceed 100 characters.',
  })
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'اسم الشهادة',
    description: 'اسم الشهادة بالعربي',
  })
  @IsString({ message: 'Arabic certificate name must be a string.' })
  @IsNotEmpty({ message: 'Arabic certificate name is required.' })
  @MaxLength(100, {
    message: 'Arabic certificate name must not exceed 100 characters.',
  })
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Nom du certificat',
    description: 'Nom du certificat en français',
  })
  @IsString({ message: 'French certificate name must be a string.' })
  @IsNotEmpty({ message: 'French certificate name is required.' })
  @MaxLength(100, {
    message: 'French certificate name must not exceed 100 characters.',
  })
  nameFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Certificate description',
    description: 'Certificate description in English',
  })
  @IsOptional()
  @IsString({ message: 'English description must be a string.' })
  @MaxLength(500, {
    message: 'English description must not exceed 500 characters.',
  })
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'وصف الشهادة',
    description: 'وصف الشهادة بالعربي',
  })
  @IsOptional()
  @IsString({ message: 'Arabic description must be a string.' })
  @MaxLength(500, {
    message: 'Arabic description must not exceed 500 characters.',
  })
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Description du certificat',
    description: 'Description du certificat en français',
  })
  @IsOptional()
  @IsString({ message: 'French description must be a string.' })
  @MaxLength(500, {
    message: 'French description must not exceed 500 characters.',
  })
  descriptionFr?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary', // عشان تظهر كـ file في Swagger
    required: false,
    description: 'صورة الشهادة (اختياري)',
  })
  @IsOptional()
  image?: any;
}
