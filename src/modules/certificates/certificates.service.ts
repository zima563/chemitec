import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCertificateDto } from '../../common/dto/create-certificate.dto';
import { UpdateCertificateDto } from '../../common/dto/update-certificate.dto';
import * as fs from 'fs';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async create(createCertificateDto: CreateCertificateDto) {
    return this.prisma.certificate.create({ data: createCertificateDto });
  }

  async findAll() {
    return this.prisma.certificate.findMany();
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
