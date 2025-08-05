import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIndustryDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Construction',
    description: 'Industry name in English',
  })
  @IsString({ message: 'Industry name (English) must be a string.' })
  @IsNotEmpty({ message: 'Industry name (English) is required.' })
  @MaxLength(100, {
    message: 'Industry name (English) must not exceed 100 characters.',
  })
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'الإنشاءات',
    description: 'اسم الصناعة بالعربي',
  })
  @IsString({ message: 'Industry name (Arabic) must be a string.' })
  @IsNotEmpty({ message: 'Industry name (Arabic) is required.' })
  @MaxLength(100, {
    message: 'Industry name (Arabic) must not exceed 100 characters.',
  })
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Construction (FR)',
    description: "Nom de l'industrie en français",
  })
  @IsString({ message: 'Industry name (French) must be a string.' })
  @IsNotEmpty({ message: 'Industry name (French) is required.' })
  @MaxLength(100, {
    message: 'Industry name (French) must not exceed 100 characters.',
  })
  nameFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Everything related to construction field.',
    description: 'Industry description in English (optional)',
  })
  @IsOptional()
  @IsString({ message: 'Industry description (English) must be a string.' })
  @MaxLength(500, {
    message: 'Industry description (English) must not exceed 500 characters.',
  })
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'كل ما يخص مجال الإنشاءات.',
    description: 'وصف الصناعة بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString({ message: 'Industry description (Arabic) must be a string.' })
  @MaxLength(500, {
    message: 'Industry description (Arabic) must not exceed 500 characters.',
  })
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Tout ce qui concerne le domaine de la construction.',
    description: "Description de l'industrie en français (facultatif)",
  })
  @IsOptional()
  @IsString({ message: 'Industry description (French) must be a string.' })
  @MaxLength(500, {
    message: 'Industry description (French) must not exceed 500 characters.',
  })
  descriptionFr?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Industry image (optional)',
  })
  @IsOptional()
  image?: any;
}
