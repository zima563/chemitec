import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIndustryDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Construction',
    description: 'اسم الصناعة',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: 'string',
    maxLength: 500,
    required: false,
    example: 'كل ما يخص مجال الإنشاءات.',
    description: 'وصف الصناعة (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary', // لازم كده عشان تظهر كـ file في Swagger
    required: false,
    description: 'صورة الصناعة (اختياري)',
  })
  @IsOptional()
  image?: any;
}
