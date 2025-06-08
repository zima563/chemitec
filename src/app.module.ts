import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './modules/brands/brands.module';
import { IndustriesModule } from './modules/industries/industries.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { TeamModule } from './modules/team/team.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { SuccessfulProductsModule } from './modules/successful-products/successful-products.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    BrandsModule,
    IndustriesModule,
    CertificatesModule,
    TeamModule,
    ContactUsModule,
    SuccessfulProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
