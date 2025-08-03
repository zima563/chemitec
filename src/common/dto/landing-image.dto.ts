import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLandingImageDto {
  @ApiPropertyOptional({
    description: 'النص البديل للصورة',
    example: 'صورة رئيسية',
  })
  @IsOptional()
  @IsString()
  alt?: string;

  @ApiPropertyOptional({ description: 'ترتيب الصورة', example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order?: number;
}

export class UpdateLandingImageDto {
  @ApiPropertyOptional({
    description: 'النص البديل للصورة',
    example: 'صورة جديدة',
  })
  @IsOptional()
  @IsString()
  alt?: string;

  @ApiPropertyOptional({ description: 'ترتيب الصورة', example: 2 })
  @IsOptional()
  @IsNumber()
  order?: number;
}
