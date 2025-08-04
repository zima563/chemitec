import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Mohamed Ragab',
    description: 'Team member name in English',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'محمد رجب',
    description: 'اسم عضو الفريق بالعربي',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Mohamed Ragab (FR)',
    description: "Nom du membre de l'équipe en français",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameFr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Project Manager',
    description: 'Position in English',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  positionEn: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'مدير مشروع',
    description: 'المسمى الوظيفي بالعربي',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  positionAr: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Chef de projet',
    description: 'Poste en français',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  positionFr: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Over 10 years experience in the field...',
    description: 'Team member bio in English (optional)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bioEn?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'خبرة أكثر من 10 سنوات في المجال...',
    description: 'نبذة عن عضو الفريق بالعربي (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bioAr?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: "Plus de 10 ans d'expérience dans le domaine...",
    description: "Bio du membre de l'équipe en français (facultatif)",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
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
