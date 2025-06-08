import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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
    description: 'صور إضافية للمنتج (اختياري - يمكن رفع أكثر من صورة)',
  })
  images?: any;
}
