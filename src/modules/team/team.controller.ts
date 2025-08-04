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
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from '../../common/dto/create-team-member.dto';
import { UpdateTeamMemberDto } from '../../common/dto/update-team-member.dto';
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
    cb(new Error('Only image files are allowed!'), false);
  } else {
    cb(null, true);
  }
};

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new team member (with image)',
    type: CreateTeamMemberDto,
  })
  @ApiOperation({ summary: 'Create team member' })
  @ApiResponse({ status: 201, description: 'Team member created successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/team',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  create(
    @Body() createTeamMemberDto: CreateTeamMemberDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? `/uploads/team/${file.filename}` : undefined;
    return this.teamService.create({
      ...createTeamMemberDto,
      image: imagePath,
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update a team member (with image)',
    type: UpdateTeamMemberDto,
  })
  @ApiOperation({ summary: 'Update team member' })
  @ApiResponse({ status: 200, description: 'Team member updated successfully' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/team',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? `/uploads/team/${file.filename}` : undefined;
    return this.teamService.update(id, {
      ...updateTeamMemberDto,
      ...(imagePath && { image: imagePath }),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all team members' })
  @ApiResponse({ status: 200, description: 'Array of team members' })
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
    return this.teamService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get team member by id' })
  @ApiResponse({ status: 200, description: 'Team member found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete team member' })
  @ApiResponse({ status: 200, description: 'Team member deleted successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.remove(id);
  }
}
