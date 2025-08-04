import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLandingImageDto {
  @ApiPropertyOptional({
    description: 'Alternative text for the image (English)',
    example: 'Main landing image',
  })
  @IsOptional()
  @IsString()
  altEn?: string;

  @ApiPropertyOptional({
    description: 'النص البديل للصورة (عربي)',
    example: 'صورة رئيسية',
  })
  @IsOptional()
  @IsString()
  altAr?: string;

  @ApiPropertyOptional({
    description: "Texte alternatif de l'image (français)",
    example: "Image principale d'accueil",
  })
  @IsOptional()
  @IsString()
  altFr?: string;

  @ApiPropertyOptional({
    description: 'ترتيب الصورة',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order?: number;
}

export class UpdateLandingImageDto {
  @ApiPropertyOptional({
    description: 'Alternative text for the image (English)',
    example: 'New landing image',
  })
  @IsOptional()
  @IsString()
  altEn?: string;

  @ApiPropertyOptional({
    description: 'النص البديل للصورة (عربي)',
    example: 'صورة جديدة',
  })
  @IsOptional()
  @IsString()
  altAr?: string;

  @ApiPropertyOptional({
    description: "Texte alternatif de l'image (français)",
    example: "Nouvelle image d'accueil",
  })
  @IsOptional()
  @IsString()
  altFr?: string;

  @ApiPropertyOptional({
    description: 'ترتيب الصورة',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order?: number;
}
