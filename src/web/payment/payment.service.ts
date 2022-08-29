import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { customAlphabet } from 'nanoid';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { CONFIG_NAME_MAIN } from '../../../config/configuration';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
    qpayUsername: string;
    qpayPassword: string;
    qpayUrl: string;
    qpayInvoiceCode: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,

        @InjectRepository(Payment)
        private paymentRepo: Repository<Payment>,
    ) {
        const { qpayUsername, qpayPassword, qpayUrl, qpayInvoiceCode } =
            configService.get(CONFIG_NAME_MAIN);
        this.qpayUsername = qpayUsername;
        this.qpayPassword = qpayPassword;
        this.qpayUrl = qpayUrl;
        this.qpayInvoiceCode = qpayInvoiceCode;
    }

    async getBankList() {
        return await this.createInvoice();
    }

    getBearerToken() {
        const authToken = Buffer.from(
            `${this.qpayUsername}:${this.qpayPassword}`,
        ).toString('base64');
        return authToken;
    }

    async getAccessToken() {
        try {
            const authToken = this.getBearerToken();
            const getTokenObs = this.httpService.post(
                `${this.qpayUrl}/v2/auth/token`,
                {},
                {
                    headers: {
                        Authorization: `Basic ${authToken}`,
                    },
                },
            );
            const result = await await lastValueFrom(getTokenObs);
            return result.data.access_token;
        } catch (error) {
            console.log('TOKEN ERROR', error.message);
        }
    }

    async createInvoice() {
        try {
            const accessToken = await this.getAccessToken();
            const nanoid = customAlphabet(
                '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
                30,
            );
            const invoiceId = nanoid();

            const invoice = {
                invoice_code: this.qpayInvoiceCode,
                sender_invoice_no: invoiceId,
                invoice_receiver_code: 'terminal',
                invoice_description: 'Авиа нэг сарын багц авах',
                amount: 100,
                callback_uri: 'https://avia.m/api/payment/result',
            };

            const payment = new Payment();
            payment.invoiceId = invoiceId;
            payment.userEmail = 'test@test.com';

            const createInvoiceObs = this.httpService.post(
                `${this.qpayUrl}/v2/invoice`,
                invoice,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            const result = await await lastValueFrom(createInvoiceObs);
            const deeplinks = result.data.urls;
            const formattedData = deeplinks
                .map((link) => {
                    const bankName = link.name;
                    const formatted: { [prop: string]: string } = {};

                    switch (bankName) {
                        case 'Khan bank':
                            formatted.bankType = 'khan';
                            break;
                        case 'State bank':
                            formatted.bankType = 'state';
                            break;
                        case 'Xac bank':
                            formatted.bankType = 'khas';
                            break;
                        case 'Trade and Development bank':
                            formatted.bankType = 'tdbm';
                            break;
                        case 'Most money':
                            formatted.bankType = 'mostmoney';
                            break;
                        case 'Chinggis khaan bank':
                            formatted.bankType = 'chingiskhan';
                            break;
                        case 'Capitron bank':
                            formatted.bankType = 'capitron';
                            break;
                        case 'Bogd bank':
                            formatted.bankType = 'bogd';
                            break;
                        default:
                            return;
                    }

                    formatted.name = link.name;
                    formatted.deeplink = link.link;
                    return formatted;
                })
                .filter((data) => (data ? data : false));
            console.log(formattedData);
            return formattedData;
        } catch (error) {
            console.log('CREATE INVOICE ERROR', error.message);
        }
    }
}
