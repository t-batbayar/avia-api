import { Controller, Get } from '@nestjs/common';

import { PaymentStatusService } from './payment-status.service';

@Controller('payment-status')
export class PaymentStatusController {
    constructor(private readonly paymentStatusService: PaymentStatusService) {}

    @Get()
    async getPaymentStatus() {
        return await this.paymentStatusService.findOne();
    }
}
