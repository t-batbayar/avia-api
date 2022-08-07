import { PartialType } from '@nestjs/swagger';
import { CreateHybridContactDto } from './create-hybrid-contact.dto';

export class UpdateHybridContactDto extends PartialType(CreateHybridContactDto) {}
