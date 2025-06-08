import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMemberDto } from './create-team-member.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'صورة عضو الفريق (اختياري)',
  })
  image?: any;
}
