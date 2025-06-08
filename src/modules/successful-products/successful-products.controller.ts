import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SuccessfulProductsService } from './successful-products.service';
import { CreateSuccessfulProductDto } from '../../common/dto/create-successful-product.dto';
import { UpdateSuccessfulProductDto } from '../../common/dto/update-successful-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

function generateFileName(file: Express.Multer.File) {
  const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return uniqueName + extname(file.originalname);
}

@Controller('successful-products')
export class SuccessfulProductsController {
  constructor(private readonly service: SuccessfulProductsService) {}

  @Post()
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
          destination: './uploads/successful-products',
          filename: (req, file, cb) => cb(null, generateFileName(file)),
        }),
      },
    ),
  )
  async create(
    @Body() dto: CreateSuccessfulProductDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; images?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0]
      ? `/uploads/successful-products/${files.image[0].filename}`
      : undefined;
    const images =
      files.images?.map((f) => `/uploads/successful-products/${f.filename}`) ||
      [];
    return this.service.create(dto, image, images);
  }

  @Patch(':id')
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
          destination: './uploads/successful-products',
          filename: (req, file, cb) => cb(null, generateFileName(file)),
        }),
      },
    ),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSuccessfulProductDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; images?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0]
      ? `/uploads/successful-products/${files.image[0].filename}`
      : undefined;
    const images =
      files.images?.map((f) => `/uploads/successful-products/${f.filename}`) ||
      [];
    return this.service.update(id, dto, image, images);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get()
  findAll(@Query() query: any){
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
