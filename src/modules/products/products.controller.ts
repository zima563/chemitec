import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../../common/dto/create-product.dto';
import { UpdateProductDto } from '../../common/dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

function generateFileName(file: Express.Multer.File) {
  const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return uniqueName + extname(file.originalname);
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => cb(null, generateFileName(file)),
        }),
      },
    ),
  )
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; images?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0]
      ? `/uploads/${files.image[0].filename}`
      : null;
    const images = files.images?.map((f) => `/uploads/${f.filename}`) || [];
    return this.productService.create(dto, image, images);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => cb(null, generateFileName(file)),
        }),
      },
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; images?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0]
      ? `/uploads/${files.image[0].filename}`
      : null;
    const images = files.images?.map((f) => `/uploads/${f.filename}`) || [];
    return this.productService.update(+id, dto, image, images);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
