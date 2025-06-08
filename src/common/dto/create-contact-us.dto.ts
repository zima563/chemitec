import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactUsDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Mohamed Ragab',
    description: 'اسم المرسل',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'user@email.com',
    description: 'البريد الإلكتروني للمرسل',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Technical Support',
    description: 'الموضوع (Subject)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string;

  @ApiProperty({
    type: 'string',
    maxLength: 20,
    required: false,
    example: '+201000000000',
    description: 'رقم الهاتف (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    type: 'string',
    maxLength: 1000,
    example: 'I have an issue with my order.',
    description: 'محتوى الرسالة',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message: string;
}
