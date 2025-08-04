import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCertificateDto } from '../../common/dto/create-certificate.dto';
import { UpdateCertificateDto } from '../../common/dto/update-certificate.dto';
import * as fs from 'fs';
import { ApiFeatures } from 'src/common/utils/api-features';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async create(createCertificateDto: CreateCertificateDto) {
    return this.prisma.certificate.create({ data: createCertificateDto });
  }

  async findAll(query: any) {
    // استخدم ApiFeatures
    const api = new ApiFeatures(this.prisma.certificate, query)
      .search([
        'name',
        'nameAr',
        'nameEn',
        'description',
        'descriptionAr',
        'descriptionEn',
      ])
      .filter(['id']) // زود لو في فلترة إضافية
      .paginate()
      .sort();

    return api.execWithCount();
  }

  async findOne(id: number) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id },
    });
    if (!certificate) throw new NotFoundException('Certificate not found');
    return certificate;
  }

  async update(id: number, updateCertificateDto: UpdateCertificateDto) {
    let certificate = await this.findOne(id);
    if (certificate.image && updateCertificateDto.image === null) {
      updateCertificateDto.image = certificate.image;
    }
    if (updateCertificateDto.image && certificate.image) {
      // If a new image is provided, delete the old one
      const path = '.' + certificate.image;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    }
    return this.prisma.certificate.update({
      where: { id },
      data: updateCertificateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.certificate.delete({ where: { id } });
  }
}
