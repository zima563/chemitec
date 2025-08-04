import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  ForbiddenException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IndustriesService } from './industries.service';
import { CreateIndustryDto } from '../../common/dto/create-industry.dto';
import { UpdateIndustryDto } from '../../common/dto/update-industry.dto';
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

const editFileName = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, uniqueSuffix + extname(file.originalname));
};

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    cb(new ForbiddenException('Only image files are allowed!'), false);
  } else {
    cb(null, true);
  }
};

@ApiTags('Industries')
@Controller('industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new industry',
    type: CreateIndustryDto,
  })
  @ApiOperation({ summary: 'Create industry' })
  @ApiResponse({ status: 201, description: 'Industry created successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/industries',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  create(
    @Body() createIndustryDto: CreateIndustryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? `/uploads/industries/${file.filename}` : undefined;
    return this.industriesService.create({
      ...createIndustryDto,
      image: imagePath,
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an industry',
    type: UpdateIndustryDto,
  })
  @ApiOperation({ summary: 'Update industry' })
  @ApiResponse({ status: 200, description: 'Industry updated successfully' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/industries',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIndustryDto: UpdateIndustryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? `/uploads/industries/${file.filename}` : undefined;
    return this.industriesService.update(id, {
      ...updateIndustryDto,
      ...(imagePath && { image: imagePath }),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all industries' })
  @ApiResponse({ status: 200, description: 'Array of industries' })
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
  findAll(@Query() query: any) {
    return this.industriesService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get industry by id' })
  @ApiResponse({ status: 200, description: 'Industry found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.industriesService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete industry' })
  @ApiResponse({ status: 200, description: 'Industry deleted successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.industriesService.remove(id);
  }
}
