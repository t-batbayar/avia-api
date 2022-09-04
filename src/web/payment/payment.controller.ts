import { Controller, Get, Param, Query, Response } from '@nestjs/common';

import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('payment/bank-list')
    async getBankList() {
        return await this.paymentService.getBankList();
    }

    @Get('webhook?')
    async paymentResult(@Query('invoiceid') invoiceId: string) {
        await this.paymentService.paymentResponse(invoiceId);
        return { body: 'SUCCESS' };
    }
}
