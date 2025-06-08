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

@ApiTags('Successful Products')
@Controller('successful-products')
export class SuccessfulProductsController {
  constructor(private readonly service: SuccessfulProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new successful product (cover image & images)',
    type: CreateSuccessfulProductDto,
  })
  @ApiOperation({ summary: 'Create successful product' })
  @ApiResponse({ status: 201, description: 'Successful product created' })
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
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update a successful product (cover image & images)',
    type: UpdateSuccessfulProductDto,
  })
  @ApiOperation({ summary: 'Update successful product' })
  @ApiResponse({ status: 200, description: 'Successful product updated' })
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
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete successful product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all successful products' })
  @ApiResponse({ status: 200, description: 'Array of successful products' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get successful product by id' })
  @ApiResponse({ status: 200, description: 'Successful product found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
