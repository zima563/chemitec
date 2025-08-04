import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBrandDto } from '../../common/dto/create-brand.dto';
import { UpdateBrandDto } from '../../common/dto/update-brand.dto';
import * as fs from 'fs';
import { ApiFeatures } from 'src/common/utils/api-features';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.create({ data: createBrandDto });
  }

  async findAll(query: any) {
    // استخدم ApiFeatures
    const api = new ApiFeatures(this.prisma.brand, query)
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
      .sort()
      .setInclude({ products: true });

    return api.execWithCount();
  }

  async findOne(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    let brand = await this.findOne(id); // For 404 check
    if (brand.logo && updateBrandDto.logo === undefined) {
      // If logo is not provided in update, keep the existing one
      updateBrandDto.logo = brand.logo;
    } else if (updateBrandDto.logo === null) {
      // If logo is explicitly set to null, remove it
      updateBrandDto.logo = undefined;
    }

    if (updateBrandDto.logo) {
      // Delete the old logo if it exists
      if (brand.logo && brand.logo.startsWith('/uploads/brands/')) {
        const path = '.' + brand.logo;
        if (fs.existsSync(path)) fs.unlinkSync(path);
      }
    }
    return this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // For 404 check
    return this.prisma.brand.delete({ where: { id } });
  }
}
