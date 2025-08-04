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

import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from '../../common/dto/create-certificate.dto';
import { UpdateCertificateDto } from '../../common/dto/update-certificate.dto';

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

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new certificate',
    type: CreateCertificateDto,
  })
  @ApiOperation({ summary: 'Create certificate' })
  @ApiResponse({ status: 201, description: 'Certificate created successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/certificates',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  create(
    @Body() createCertificateDto: CreateCertificateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file
      ? `/uploads/certificates/${file.filename}`
      : undefined;
    return this.certificatesService.create({
      ...createCertificateDto,
      image: imagePath,
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update a certificate',
    type: UpdateCertificateDto,
  })
  @ApiOperation({ summary: 'Update certificate' })
  @ApiResponse({ status: 200, description: 'Certificate updated successfully' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/certificates',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCertificateDto: UpdateCertificateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file
      ? `/uploads/certificates/${file.filename}`
      : undefined;
    return this.certificatesService.update(id, {
      ...updateCertificateDto,
      ...(imagePath && { image: imagePath }),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiResponse({ status: 200, description: 'Array of certificates' })
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
    return this.certificatesService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get certificate by id' })
  @ApiResponse({ status: 200, description: 'Certificate found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.certificatesService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete certificate' })
  @ApiResponse({ status: 200, description: 'Certificate deleted successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.certificatesService.remove(id);
  }
}
