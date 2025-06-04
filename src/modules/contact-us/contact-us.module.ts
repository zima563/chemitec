import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ContactUsController],
  providers: [ContactUsService, PrismaService],
})
export class ContactUsModule {}
