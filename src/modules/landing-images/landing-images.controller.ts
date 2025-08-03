// src/modules/landing-images/landing-images.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LandingImagesService } from './landing-images.services';
import {
  CreateLandingImageDto,
  UpdateLandingImageDto,
} from 'src/common/dto/landing-image.dto';
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
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

const editFileName = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, uniqueSuffix + extname(file.originalname));
};

@ApiTags('Landing Images')
@Controller('landing-images')
export class LandingImagesController {
  constructor(private readonly service: LandingImagesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'رفع أكتر من صورة دفعة واحدة',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        alt: { type: 'string', example: 'Alt text' },
        order: { type: 'number', example: 1 },
      },
    },
  })
  @ApiOperation({ summary: 'Add multiple landing images' })
  @ApiResponse({
    status: 201,
    description: 'Landing images created successfully',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/landing',
        filename: editFileName,
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 4 * 1024 * 1024 },
    }),
  )
  async create(
    @Body() dto: CreateLandingImageDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    if (!images || images.length === 0) {
      throw new Error('At least one image is required.');
    }
    const urls = images.map((img) => `/uploads/landing/${img.filename}`);
    // هيسجلهم مرة واحدة
    await this.service.createMany(dto, urls);
    return {
      message: 'Images uploaded successfully',
      count: images.length,
      urls,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all landing images' })
  @ApiResponse({ status: 200, description: 'All landing images' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get landing image by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update landing image (image is optional)',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        alt: { type: 'string', example: 'New alt' },
        order: { type: 'number', example: 2 },
      },
    },
  })
  @ApiOperation({ summary: 'Update landing image' })
  @ApiResponse({
    status: 200,
    description: 'Landing image updated successfully',
  })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      storage: diskStorage({
        destination: './uploads/landing',
        filename: editFileName,
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 4 * 1024 * 1024 },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLandingImageDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let url: string | undefined;
    if (files && files.length > 0) {
      url = `/uploads/landing/${files[0].filename}`;
    }
    return this.service.update(id, dto, url);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete landing image' })
  @ApiResponse({
    status: 200,
    description: 'Landing image deleted successfully',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
