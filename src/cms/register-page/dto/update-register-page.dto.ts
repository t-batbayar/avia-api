import { PartialType } from '@nestjs/swagger';

import { CreateRegisterPageDto } from './create-register-page.dto';

export class UpdateRegisterPageDto extends PartialType(CreateRegisterPageDto) {}
