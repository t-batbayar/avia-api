import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomersService } from './customers.service';
import { CheckPasswordDto } from './dto/check-password.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerPasswordDto } from './dto/create-password.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post('register')
    register(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Get('check-token')
    checkToken(@Query('token') token: string) {
        return this.customersService.checkToken(token);
    }

    @Post('create-password')
    createPassword(@Body() body: CreateCustomerPasswordDto) {
        return this.customersService.createPassword(body);
    }

    @Get('check-password')
    checkPassword(@Query() query: CheckPasswordDto) {
        return this.customersService.checkPassword(query);
    }

    @Get()
    findAll(@Query('email') email: string) {
        return this.customersService.findAll(email);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customersService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return this.customersService.update(+id, updateCustomerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customersService.remove(+id);
    }

    @Post('reset-password')
    async resetPassword(@Body('username') email: string) {
        const result = await this.customersService.resetPassword(email);
        return result;
    }

    @Post('change-password')
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        const result = await this.customersService.updatePassword(
            updatePasswordDto,
        );
        return result;
    }
}
