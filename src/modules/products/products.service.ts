import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from '../../common/dto/create-product.dto';
import { UpdateProductDto } from '../../common/dto/update-product.dto';
import * as fs from 'fs';
import { ApiFeatures } from 'src/common/utils/api-features';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto, image: string | null, gallery: string[]) {
    return this.prisma.product.create({
      data: {
        ...dto,
        image,
        images: {
          create: gallery.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
  }

  async update(
    id: number,
    dto: UpdateProductDto,
    newImage: string | null,
    newGallery: string[],
  ) {
    const existing = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!existing) throw new NotFoundException('Product not found');

    if (newImage && existing.image) {
      const path = '.' + existing.image;
      if (fs.existsSync(path)) fs.unlinkSync(path);
    }

    if (newGallery.length > 0 && existing.images?.length) {
      for (const img of existing.images) {
        const path = '.' + img.url;
        if (fs.existsSync(path)) fs.unlinkSync(path);
      }
      await this.prisma.productImage.deleteMany({ where: { productId: id } });
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        image: newImage || existing.image,
        images: {
          create: newGallery.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!product) throw new NotFoundException('Product not found');

    if (product.image) {
      const path = '.' + product.image;
      if (fs.existsSync(path)) fs.unlinkSync(path);
    }
    for (const img of product.images) {
      const path = '.' + img.url;
      if (fs.existsSync(path)) fs.unlinkSync(path);
    }

    return this.prisma.product.delete({ where: { id } });
  }

  async findAll(query: any) {
    // استخدم ApiFeatures
    const api = new ApiFeatures(this.prisma.product, query)
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

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { brand: true, industry: true, images: true },
    });
  }
}
