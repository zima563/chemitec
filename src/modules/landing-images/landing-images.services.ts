// src/modules/landing-images/landing-images.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateLandingImageDto,
  UpdateLandingImageDto,
} from 'src/common/dto/landing-image.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LandingImagesService {
  constructor(private prisma: PrismaService) {}

  async deleteAllImagesFromServerAndDB() {
    // 1. هات كل الصور
    const all = await this.prisma.landingImage.findMany();
    // 2. امسح كل صورة من السيرفر (لو الملف موجود)
    for (const img of all) {
      if (img.url) {
        const filePath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          'uploads',
          'landing',
          path.basename(img.url),
        );
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (e) {}
        }
      }
    }
    // 3. امسح كل الريكوردات من الداتا بيز
    await this.prisma.landingImage.deleteMany();
  }

  async createMany(dto: CreateLandingImageDto, images: string[]) {
    await this.deleteAllImagesFromServerAndDB();
    const records = images.map((url) => ({
      ...dto,
      url,
    }));
    return this.prisma.landingImage.createMany({
      data: records,
    });
  }

  async findAll() {
    return this.prisma.landingImage.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const image = await this.prisma.landingImage.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('Landing image not found');
    return image;
  }

  async update(id: number, dto: UpdateLandingImageDto, url?: string) {
    return this.prisma.landingImage.update({
      where: { id },
      data: {
        ...dto,
        ...(url && { url }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.landingImage.delete({ where: { id } });
  }
}
