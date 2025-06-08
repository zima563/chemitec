import { Module } from '@nestjs/common';
import { SuccessfulProductsService } from './successful-products.service';
import { SuccessfulProductsController } from './successful-products.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SuccessfulProductsService, PrismaService],
  controllers: [SuccessfulProductsController],
})
export class SuccessfulProductsModule {}
