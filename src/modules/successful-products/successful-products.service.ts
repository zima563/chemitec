import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
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

  // CREATE (نفس اللي قبل)
  async create(
    createDto: CreateSuccessfulProductDto,
    imagePath?: string,
    additionalImages?: string[]
  ) {
    return this.prisma.successfulProduct.create({
      data: {
        ...createDto,
        image: imagePath,
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
    additionalImages?: string[]
  ) {
    const old = await this.prisma.successfulProduct.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!old) throw new NotFoundException('SuccessfulProduct not found');

    // حذف صورة الـ cover القديمة لو جاي صورة جديدة
    if (imagePath && old.image) deleteFileIfExists(old.image);

    // حذف كل الصور القديمة الإضافية لو جاي صور جديدة
    if (additionalImages && old.images.length > 0) {
      old.images.forEach(img => {
        if (img.url) deleteFileIfExists(img.url);
      });
      // امسحهم من الداتا بيز كمان
      await this.prisma.successfulProductImage.deleteMany({ where: { successfulProductId: id } });
    }

    return this.prisma.successfulProduct.update({
      where: { id },
      data: {
        ...updateDto,
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

    // امسح صورة الغلاف
    if (old.image) deleteFileIfExists(old.image);

    // امسح كل الصور الإضافية
    old.images.forEach(img => {
      if (img.url) deleteFileIfExists(img.url);
    });

    return this.prisma.successfulProduct.delete({ where: { id } });
  }

  // FIND ALL
  async findAll(reqQuery: any) {
    const api = new ApiFeatures(this.prisma.successfulProduct, reqQuery)
      .search(['title', 'description'])
      .filter(['id']) // أضف أي حقول تحبها
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
    return product;
  }

}

