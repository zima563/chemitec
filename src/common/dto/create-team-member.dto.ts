import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Mohamed Ragab',
    description: 'اسم عضو الفريق',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: 'string',
    maxLength: 100,
    example: 'Project Manager',
    description: 'المسمى الوظيفي',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  position: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'خبرة أكثر من 10 سنوات في المجال...',
    description: 'نبذة عن عضو الفريق (اختياري)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'صورة عضو الفريق (اختياري)',
    required: false,
  })
  @IsOptional()
  image?: any;
}
