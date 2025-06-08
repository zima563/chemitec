import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificateDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Certificate Name',
    description: 'اسم الشهادة',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: 'string',
    maxLength: 500,
    required: false,
    example: 'Certificate description',
    description: 'وصف الشهادة',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary', // مهم عشان تظهر في Swagger كـ file
    required: false,
    description: 'صورة الشهادة (اختياري)',
  })
  @IsOptional()
  image?: any; // لازم any أو Express.Multer.File
}
