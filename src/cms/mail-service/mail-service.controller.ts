import { Controller } from '@nestjs/common';

import { MailServiceService } from './mail-service.service';

@Controller('mail-service')
export class MailServiceController {
    constructor(private readonly mailServiceService: MailServiceService) {}
}
