import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Brand Name',
    description: 'اسم البراند',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: 'string',
    maxLength: 500,
    required: false,
    example: 'Brand description',
    description: 'وصف البراند',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary', // عشان تظهر كـ file في Swagger
    required: false,
    description: 'لوجو البراند (صورة)',
  })
  @IsOptional()
  logo?: any; // خليه any عشان الـ file
}
