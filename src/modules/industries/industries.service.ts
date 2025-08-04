import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateIndustryDto } from '../../common/dto/create-industry.dto';
import { UpdateIndustryDto } from '../../common/dto/update-industry.dto';
import * as fs from 'fs';
import { ApiFeatures } from 'src/common/utils/api-features';

@Injectable()
export class IndustriesService {
  constructor(private prisma: PrismaService) {}

  async create(createIndustryDto: CreateIndustryDto) {
    return this.prisma.industry.create({ data: createIndustryDto });
  }

  async findAll(query: any) {
    // استخدم ApiFeatures
    const api = new ApiFeatures(this.prisma.industry, query)
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
    const industry = await this.prisma.industry.findUnique({
      where: { id },
    });
    if (!industry) throw new NotFoundException('Industry not found');
    return industry;
  }

  async update(id: number, updateIndustryDto: UpdateIndustryDto) {
    let industry = await this.findOne(id);
    if (industry.image && updateIndustryDto.image === null) {
      updateIndustryDto.image = industry.image;
    }

    if (updateIndustryDto.image === null) {
      updateIndustryDto.image = undefined; // Remove image if explicitly set to null
    }

    if (updateIndustryDto.image && industry.image) {
      // If a new image is provided, delete the old one
      const path = '.' + industry.image;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    }
    return this.prisma.industry.update({
      where: { id },
      data: updateIndustryDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.industry.delete({ where: { id } });
  }
}
