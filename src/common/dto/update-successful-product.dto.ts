import { PartialType } from '@nestjs/mapped-types';
import { CreateSuccessfulProductDto } from './create-successful-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSuccessfulProductDto extends PartialType(CreateSuccessfulProductDto) {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'صورة الغلاف (اختياري)',
  })
  image?: any;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
    description: 'صور إضافية (اختياري - يمكنك رفع أكثر من صورة)',
  })
  images?: any;
}
