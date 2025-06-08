import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSuccessfulProductDto {
  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'عمارة سكنية في التجمع',
    description: 'عنوان المنتج الناجح',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 1000,
    example: 'تم تنفيذ المشروع بنجاح في وقت قياسي...',
    description: 'وصف المنتج الناجح (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'صورة الغلاف (اختياري)',
    required: false,
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'صور إضافية (اختياري - يمكنك رفع أكثر من صورة)',
    required: false,
  })
  @IsOptional()
  images?: any;
}
