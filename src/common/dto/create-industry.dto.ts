import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIndustryDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Construction',
    description: 'Industry name in English',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'الإنشاءات',
    description: 'اسم الصناعة بالعربي',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Construction (FR)',
    description: "Nom de l'industrie en français",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Everything related to construction field.',
    description: 'Industry description in English (optional)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'كل ما يخص مجال الإنشاءات.',
    description: 'وصف الصناعة بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Tout ce qui concerne le domaine de la construction.',
    description: "Description de l'industrie en français (facultatif)",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
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
