import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamMemberDto } from '../../common/dto/create-team-member.dto';
import { UpdateTeamMemberDto } from '../../common/dto/update-team-member.dto';
import * as fs from 'fs';
import { ApiFeatures } from 'src/common/utils/api-features';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamMemberDto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({ data: createTeamMemberDto });
  }

  async findAll(query: any) {
    const api = new ApiFeatures(this.prisma.teamMember, query)
      .search([
        'nameFr',
        'nameAr',
        'nameEn',
        'positionEn',
        'positionAr',
        'positionFr',
        'bioEn',
        'bioAr',
        'bioFr',
      ])
      .filter(['id'])
      .paginate()
      .sort()
      .setInclude({ images: true });

    return api.execWithCount();
  }

  async findOne(id: number) {
    const member = await this.prisma.teamMember.findUnique({
      where: { id },
    });
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  async update(id: number, updateTeamMemberDto: UpdateTeamMemberDto) {
    let team = await this.findOne(id);
    if (team.image && updateTeamMemberDto.image === null) {
      updateTeamMemberDto.image = team.image;
    }

    if (updateTeamMemberDto.image && team.image) {
      // If a new image is provided, delete the old one
      const path = '.' + team.image;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    }
    return this.prisma.teamMember.update({
      where: { id },
      data: updateTeamMemberDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.teamMember.delete({ where: { id } });
  }
}
