import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Mohamed Ragab',
    description: 'Team member name in English',
  })
  @IsString({ message: 'Name (English) must be a string.' })
  @IsNotEmpty({ message: 'Name (English) is required.' })
  @MaxLength(100, { message: 'Name (English) must not exceed 100 characters.' })
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'محمد رجب',
    description: 'اسم عضو الفريق بالعربي',
  })
  @IsString({ message: 'الاسم (بالعربي) لازم يكون نص.' })
  @IsNotEmpty({ message: 'الاسم (بالعربي) مطلوب.' })
  @MaxLength(100, { message: 'الاسم (بالعربي) يجب ألا يزيد عن 100 حرف.' })
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Mohamed Ragab (FR)',
    description: "Nom du membre de l'équipe en français",
  })
  @IsString({ message: 'Le nom (FR) doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le nom (FR) est obligatoire.' })
  @MaxLength(100, {
    message: 'Le nom (FR) ne doit pas dépasser 100 caractères.',
  })
  nameFr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Project Manager',
    description: 'Position in English',
  })
  @IsString({ message: 'Position (English) must be a string.' })
  @IsNotEmpty({ message: 'Position (English) is required.' })
  @MaxLength(100, {
    message: 'Position (English) must not exceed 100 characters.',
  })
  positionEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'مدير مشروع',
    description: 'المسمى الوظيفي بالعربي',
  })
  @IsString({ message: 'المسمى الوظيفي (بالعربي) لازم يكون نص.' })
  @IsNotEmpty({ message: 'المسمى الوظيفي (بالعربي) مطلوب.' })
  @MaxLength(100, {
    message: 'المسمى الوظيفي (بالعربي) يجب ألا يزيد عن 100 حرف.',
  })
  positionAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Chef de projet',
    description: 'Poste en français',
  })
  @IsString({ message: 'Le poste (FR) doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le poste (FR) est obligatoire.' })
  @MaxLength(100, {
    message: 'Le poste (FR) ne doit pas dépasser 100 caractères.',
  })
  positionFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Over 10 years experience in the field...',
    description: 'Team member bio in English (optional)',
  })
  @IsOptional()
  @IsString({ message: 'Bio (English) must be a string.' })
  @MaxLength(500, { message: 'Bio (English) must not exceed 500 characters.' })
  bioEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'خبرة أكثر من 10 سنوات في المجال...',
    description: 'نبذة عن عضو الفريق بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString({ message: 'النبذة (بالعربي) لازم تكون نص.' })
  @MaxLength(500, { message: 'النبذة (بالعربي) يجب ألا تزيد عن 500 حرف.' })
  bioAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: "Plus de 10 ans d'expérience dans le domaine...",
    description: "Bio du membre de l'équipe en français (facultatif)",
  })
  @IsOptional()
  @IsString({ message: 'La bio (FR) doit être une chaîne de caractères.' })
  @MaxLength(500, {
    message: 'La bio (FR) ne doit pas dépasser 500 caractères.',
  })
  bioFr?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Team member image (optional)',
    required: false,
  })
  @IsOptional()
  image?: any;
}
