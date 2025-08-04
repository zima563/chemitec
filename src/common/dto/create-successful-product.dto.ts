import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSuccessfulProductDto {
  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Residential Building in New Cairo',
    description: 'Title of the successful product in English',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'عمارة سكنية في التجمع',
    description: 'عنوان المنتج الناجح بالعربي',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Immeuble résidentiel au Nouveau Caire',
    description: 'Titre du produit réussi en français',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'The project was completed successfully in record time...',
    description: 'Successful product description in English (optional)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'تم تنفيذ المشروع بنجاح في وقت قياسي...',
    description: 'وصف المنتج الناجح بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'Le projet a été achevé avec succès dans un délai record...',
    description: 'Description du produit réussi en français (facultatif)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
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
