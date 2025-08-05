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
    example: 'Mohamed Abdelazim',
    description: 'اسم المرسل',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Sender name is required.' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters.' })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'user@email.com',
    description: 'البريد الإلكتروني للمرسل',
  })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty({
    type: 'string',
    maxLength: 200,
    example: 'Technical Support',
    description: 'الموضوع (Subject)',
  })
  @IsString({ message: 'Subject must be a string.' })
  @IsNotEmpty({ message: 'Subject is required.' })
  @MaxLength(200, { message: 'Subject must not exceed 200 characters.' })
  subject: string;

  @ApiProperty({
    type: 'string',
    maxLength: 20,
    required: false,
    example: '+201000000000',
    description: 'رقم الهاتف (اختياري)',
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string.' })
  @MaxLength(20, { message: 'Phone number must not exceed 20 characters.' })
  phone?: string;

  @ApiProperty({
    type: 'string',
    maxLength: 1000,
    example: 'I have an issue with my order.',
    description: 'محتوى الرسالة',
  })
  @IsString({ message: 'Message content must be a string.' })
  @IsNotEmpty({ message: 'Message content is required.' })
  @MaxLength(1000, { message: 'Message must not exceed 1000 characters.' })
  message: string;
}
