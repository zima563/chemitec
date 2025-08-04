import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificateDto } from './create-certificate.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCertificateDto extends PartialType(CreateCertificateDto) {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'صورة الشهادة (اختياري)',
  })
  image?: any;
}
