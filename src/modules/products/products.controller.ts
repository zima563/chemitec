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
  Query,
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

import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

function generateFileName(file: Express.Multer.File) {
  const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return uniqueName + extname(file.originalname);
}

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new product (cover image & additional images)',
    type: CreateProductDto,
  })
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
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
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update a product (cover image & additional images)',
    type: UpdateProductDto,
  })
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiParam({ name: 'id', type: Number })
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
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Array of products' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    example: 'desc',
  })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'brandId', required: false, type: Number })
  @ApiQuery({ name: 'industryId', required: false, type: Number })
  findAll(@Query() query: any) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'Product found' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
