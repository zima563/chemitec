import { PartialType } from '@nestjs/mapped-types';
import { CreateSuccessfulProductDto } from './create-successful-product.dto';

export class UpdateSuccessfulProductDto extends PartialType(CreateSuccessfulProductDto) {}
