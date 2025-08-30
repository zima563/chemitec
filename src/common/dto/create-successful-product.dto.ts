import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateSuccessfulProductDto {
  @ApiProperty({ example: 'Residential Building in New Cairo', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleEn: string;

  @ApiProperty({ example: 'عمارة سكنية في التجمع', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleAr: string;

  @ApiProperty({ example: 'Bâtiment résidentiel au Caire', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleFr: string;

  @ApiProperty({
    example: ['First point', 'Second point'],
    type: 'array',
    items: { type: 'string' },
  })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value,
  )
  descriptionEn: string[];

  @ApiProperty({
    example: ['النقطة الأولى', 'النقطة الثانية'],
    type: 'array',
    items: { type: 'string' },
  })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value,
  )
  descriptionAr: string[];

  @ApiProperty({
    example: ['Premier point', 'Deuxième point'],
    type: 'array',
    items: { type: 'string' },
  })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value,
  )
  descriptionFr: string[];

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Cover image (optional)',
    required: false,
  })
  @IsOptional()
  image?: any;
}
