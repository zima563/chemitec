import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { IndustriesController } from './industries.controller';

@Module({
  providers: [IndustriesService],
  controllers: [IndustriesController]
})
export class IndustriesModule {}
