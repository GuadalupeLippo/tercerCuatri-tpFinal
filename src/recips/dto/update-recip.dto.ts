import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipDto } from './create-recip.dto';

export class UpdateRecipDto extends PartialType(CreateRecipDto) {}
