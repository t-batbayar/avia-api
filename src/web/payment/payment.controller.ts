import { Controller, Get, Param, Response } from '@nestjs/common';

import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('bank-list')
    async getBankList() {
        return await this.paymentService.getBankList();
    }

    @Get('result/:invoiceId')
    async paymentResult(@Param('invoiceId') invoiceId: string) {
        console.log('INVOICE ID IS:', invoiceId);
        await this.paymentService.paymentResponse(invoiceId);
        return { body: 'SUCCESS' };
    }
}
