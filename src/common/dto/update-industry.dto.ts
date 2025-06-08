import { PartialType } from '@nestjs/mapped-types';
import { CreateIndustryDto } from './create-industry.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIndustryDto extends PartialType(CreateIndustryDto) {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'صورة الصناعة (اختياري)',
  })
  image?: any;
}
