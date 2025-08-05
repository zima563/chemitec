import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSuccessfulProductDto {
  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Residential Building in New Cairo',
    description: 'Title of the successful product in English',
  })
  @IsString({ message: 'Title (English) must be a string.' })
  @IsNotEmpty({ message: 'Title (English) is required.' })
  @MaxLength(200, {
    message: 'Title (English) must not exceed 200 characters.',
  })
  titleEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'عمارة سكنية في التجمع',
    description: 'عنوان المنتج الناجح بالعربي',
  })
  @IsString({ message: 'العنوان (بالعربي) لازم يكون نص.' })
  @IsNotEmpty({ message: 'العنوان (بالعربي) مطلوب.' })
  @MaxLength(200, { message: 'العنوان (بالعربي) يجب ألا يزيد عن 200 حرف.' })
  titleAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Immeuble résidentiel au Nouveau Caire',
    description: 'Titre du produit réussi en français',
  })
  @IsString({ message: 'Le titre (FR) doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le titre (FR) est obligatoire.' })
  @MaxLength(200, {
    message: 'Le titre (FR) ne doit pas dépasser 200 caractères.',
  })
  titleFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'The project was completed successfully in record time...',
    description: 'Successful product description in English (optional)',
  })
  @IsOptional()
  @IsString({ message: 'Description (English) must be a string.' })
  @MaxLength(1000, {
    message: 'Description (English) must not exceed 1000 characters.',
  })
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'تم تنفيذ المشروع بنجاح في وقت قياسي...',
    description: 'وصف المنتج الناجح بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString({ message: 'الوصف (بالعربي) لازم يكون نص.' })
  @MaxLength(1000, { message: 'الوصف (بالعربي) يجب ألا يزيد عن 1000 حرف.' })
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'Le projet a été achevé avec succès dans un délai record...',
    description: 'Description du produit réussi en français (facultatif)',
  })
  @IsOptional()
  @IsString({
    message: 'La description (FR) doit être une chaîne de caractères.',
  })
  @MaxLength(1000, {
    message: 'La description (FR) ne doit pas dépasser 1000 caractères.',
  })
  descriptionFr?: string;

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
    description: 'Additional images (optional, you can upload multiple images)',
    required: false,
  })
  @IsOptional()
  images?: any;
}
