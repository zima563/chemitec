import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBrandDto {
  @ApiPropertyOptional({
    type: 'string',
    maxLength: 100,
    example: 'Brand Name',
    description: 'Brand name in English',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 100,
    example: 'اسم البراند',
    description: 'اسم البراند بالعربي',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 100,
    example: 'Nom de la marque',
    description: 'Nom de la marque en français',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameFr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Brand description',
    description: 'Brand description in English',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'وصف البراند',
    description: 'وصف البراند بالعربي',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Description de la marque',
    description: 'Description de la marque en français',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionFr?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Brand logo image (optional)',
  })
  @IsOptional()
  logo?: any;
}
