import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { customAlphabet } from 'nanoid';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { CONFIG_NAME_MAIN } from '../../../config/configuration';
import { User } from '../../cms/users/entities/user.entity';
import { Payment, PaymentStatus } from './entities/payment.entity';

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

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @Inject(REQUEST) private request: any,
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
            console.error('TOKEN ERROR', error.message);
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
                callback_url: `https://avia.mn/api/webhook?invoiceid=${invoiceId}`,
            };

            const user = this.request.user;
            const userEmail = user.email;
            const userDeviceId = user.deviceId;
            const userLoginType = user.loginType;

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
            const qpayInvoiceId = result.data['invoice_id'];
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

            const payment = new Payment();
            payment.invoiceId = invoiceId;
            payment.userEmail = userEmail;
            payment.qpayId = qpayInvoiceId;
            await this.paymentRepo.save(payment);

            return formattedData;
        } catch (error) {
            console.error('CREATE INVOICE ERROR', error.message);
        }
    }

    async paymentResponse(invoiceId: string) {
        const payment = await this.paymentRepo.findOne({
            where: {
                invoiceId,
            },
        });

        const accessToken = await this.getAccessToken();

        const requestBody = {
            object_type: 'INVOICE',
            object_id: payment.qpayId,
            offset: {
                page_number: 1,
                page_limit: 10,
            },
        };

        const checkInvoiceObs = this.httpService.post(
            `${this.qpayUrl}/v2/payment/check`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        const result = await await lastValueFrom(checkInvoiceObs);
        const data = result.data;
        if (
            data['count'] > 1 &&
            data['rows'][0]['payment_status'] === PaymentStatus.PAID
        ) {
            const user = await this.userRepo.findOne({
                where: {
                    email: payment.userEmail,
                },
            });

            const date = new Date();
            date.setDate(date.getDate() + 30);
            user.purchaseEndDate = date;
            await this.userRepo.save(user);
            // user.purchaseEndDate =
        }
    }
}
