import { PartialType } from '@nestjs/swagger';

import { CreateHybridDescriptionDto } from './create-hybrid-description.dto';

export class UpdateHybridDescriptionDto extends PartialType(
    CreateHybridDescriptionDto,
) {}
