import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSuccessfulProductDto } from '../../common/dto/create-successful-product.dto';
import { UpdateSuccessfulProductDto } from '../../common/dto/update-successful-product.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ApiFeatures } from 'src/common/utils/api-features';

function deleteFileIfExists(filePath: string) {
  if (filePath && fs.existsSync(path.join(process.cwd(), filePath))) {
    fs.unlinkSync(path.join(process.cwd(), filePath));
  }
}

@Injectable()
export class SuccessfulProductsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(
    createDto: CreateSuccessfulProductDto,
    imagePath?: string,
    additionalImages?: string[],
  ) {
    return this.prisma.successfulProduct.create({
      data: {
        titleEn: createDto.titleEn,
        titleAr: createDto.titleAr,
        titleFr: createDto.titleFr,
        descriptionEn: createDto.descriptionEn
          ? JSON.stringify(createDto.descriptionEn)
          : Prisma.JsonNull,
        descriptionAr: createDto.descriptionAr
          ? JSON.stringify(createDto.descriptionAr)
          : Prisma.JsonNull,
        descriptionFr: createDto.descriptionFr
          ? JSON.stringify(createDto.descriptionFr)
          : Prisma.JsonNull,
        image: imagePath ?? null,
        images: {
          create: additionalImages?.map((url) => ({ url })) || [],
        },
      },
      include: { images: true },
    });
  }

  // UPDATE مع حذف الصور القديمة
  async update(
    id: number,
    updateDto: UpdateSuccessfulProductDto,
    imagePath?: string,
    additionalImages?: string[],
  ) {
    const old = await this.prisma.successfulProduct.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!old) throw new NotFoundException('SuccessfulProduct not found');

    // حذف صورة الغلاف القديمة لو جاي صورة جديدة
    if (imagePath && old.image) deleteFileIfExists(old.image);

    // حذف كل الصور القديمة الإضافية لو جاي صور جديدة
    if (additionalImages && old.images.length > 0) {
      old.images.forEach((img) => {
        if (img.url) deleteFileIfExists(img.url);
      });
      await this.prisma.successfulProductImage.deleteMany({
        where: { successfulProductId: id },
      });
    }

    return this.prisma.successfulProduct.update({
      where: { id },
      data: {
        titleEn: updateDto.titleEn ?? old.titleEn,
        titleAr: updateDto.titleAr ?? old.titleAr,
        titleFr: updateDto.titleFr ?? old.titleFr,
        descriptionEn: updateDto.descriptionEn
          ? JSON.stringify(updateDto.descriptionEn)
          : old.descriptionEn === null
            ? Prisma.JsonNull
            : old.descriptionEn,
        descriptionAr: updateDto.descriptionAr
          ? JSON.stringify(updateDto.descriptionAr)
          : old.descriptionAr === null
            ? Prisma.JsonNull
            : old.descriptionAr,
        descriptionFr: updateDto.descriptionFr
          ? JSON.stringify(updateDto.descriptionFr)
          : old.descriptionFr === null
            ? Prisma.JsonNull
            : old.descriptionFr,
        ...(imagePath && { image: imagePath }),
        ...(additionalImages && {
          images: { create: additionalImages.map((url) => ({ url })) },
        }),
      },
      include: { images: true },
    });
  }

  // DELETE مع حذف كل الصور المرتبطة
  async remove(id: number) {
    const old = await this.prisma.successfulProduct.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!old) throw new NotFoundException('SuccessfulProduct not found');

    if (old.image) deleteFileIfExists(old.image);

    old.images.forEach((img) => {
      if (img.url) deleteFileIfExists(img.url);
    });

    return this.prisma.successfulProduct.delete({ where: { id } });
  }

  // FIND ALL
  async findAll(query: any) {
    const api = new ApiFeatures(this.prisma.successfulProduct, query)
      .search(['titleEn', 'titleAr', 'titleFr']) // عدلنا على حسب الحقول الموجودة
      .filter(['id'])
      .paginate()
      .sort()
      .setInclude({ images: true });

    return api.execWithCount();
  }

  // FIND ONE
  async findOne(id: number) {
    const product = await this.prisma.successfulProduct.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!product) throw new NotFoundException('SuccessfulProduct not found');

    return {
      ...product,
      descriptionEn: product.descriptionEn
        ? JSON.parse(product.descriptionEn as any)
        : [],
      descriptionAr: product.descriptionAr
        ? JSON.parse(product.descriptionAr as any)
        : [],
      descriptionFr: product.descriptionFr
        ? JSON.parse(product.descriptionFr as any)
        : [],
    };
  }
}
