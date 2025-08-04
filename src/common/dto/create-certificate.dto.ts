import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCertificateDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Certificate Name',
    description: 'Certificate name in English',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'اسم الشهادة',
    description: 'اسم الشهادة بالعربي',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Nom du certificat',
    description: 'Nom du certificat en français',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Certificate description',
    description: 'Certificate description in English',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'وصف الشهادة',
    description: 'وصف الشهادة بالعربي',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Description du certificat',
    description: 'Description du certificat en français',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
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
