import { Controller, Delete, Headers } from '@nestjs/common';

import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Delete('delete')
    remove(@Headers() headers) {
        console.log('HEADERSSS: ', headers);
        return this.accountService.remove(headers);
    }
}
