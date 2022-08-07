import { PartialType } from '@nestjs/swagger';

import { CreateSubPracticeDto } from './create-sub-practice.dto';

export class UpdateSubPracticeDto extends PartialType(CreateSubPracticeDto) {}
