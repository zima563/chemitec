import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService],
  exports: [BrandsService],
})
export class BrandsModule {}
