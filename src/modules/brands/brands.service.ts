import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBrandDto } from '../../common/dto/create-brand.dto';
import { UpdateBrandDto } from '../../common/dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.create({ data: createBrandDto });
  }

  async findAll() {
    return this.prisma.brand.findMany({
      include: { products: true },
    });
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
    await this.findOne(id); // For 404 check
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
