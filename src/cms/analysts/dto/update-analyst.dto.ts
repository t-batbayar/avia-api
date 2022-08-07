import { PartialType } from '@nestjs/swagger';

import { CreateAnalystDto } from './create-analyst.dto';

export class UpdateAnalystDto extends PartialType(CreateAnalystDto) {}
