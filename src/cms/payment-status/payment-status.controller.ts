import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { PaymentStatusService } from './payment-status.service';

@Controller('payment-status')
export class PaymentStatusController {
    constructor(private readonly paymentStatusService: PaymentStatusService) {}

    @Post()
    create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
        return this.paymentStatusService.create(createPaymentStatusDto);
    }

    @Get()
    findAll() {
        return this.paymentStatusService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentStatusService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
    ) {
        return this.paymentStatusService.update(+id, updatePaymentStatusDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentStatusService.remove(+id);
    }
}
