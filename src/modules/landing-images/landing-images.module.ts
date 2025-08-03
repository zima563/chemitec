import { Module } from '@nestjs/common';
import { LandingImagesController } from './landing-images.controller';
import { LandingImagesService } from './landing-images.services';
import { PrismaService } from 'src/prisma/prisma.service'; // أو المسار حسب مشروعك

@Module({
  controllers: [LandingImagesController],
  providers: [LandingImagesService, PrismaService],
  exports: [LandingImagesService],
})
export class LandingImagesModule {}
