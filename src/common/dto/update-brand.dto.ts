import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBrandDto {
  @ApiPropertyOptional({
    type: 'string',
    maxLength: 100,
    example: 'Brand Name',
    description: 'اسم البراند',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    type: 'string',
    maxLength: 500,
    example: 'Brand description',
    description: 'وصف البراند',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary', // دي أهم حاجة!
    required: false,
    description: 'لوجو البراند (صورة)',
  })
  @IsOptional()
  logo?: any;
}
