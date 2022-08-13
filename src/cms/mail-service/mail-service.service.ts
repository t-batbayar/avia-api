import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
// import { MailerService } from '@nestjs-modules/mailer';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { In, LessThanOrEqual, Repository } from 'typeorm';

import { Customer } from '../../web/customers/entities/customer.entity';
import {
    CustomerRole,
    CustomerRoleEnum,
} from '../../web/customers/entities/customer-role.entity';
import { Subscriptions } from '../../web/subscriptions/entity/subscriptions.entity';
import { News } from '../news/entities/news.entity';
import { NewsMailLog } from './entities/news-mail-log.entity';

@Injectable()
export class MailServiceService {
    constructor(
        @InjectRepository(NewsMailLog)
        private newsMailLog: Repository<NewsMailLog>,

        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>,

        @InjectRepository(Subscriptions)
        private subscriptionRepo: Repository<Subscriptions>,

        @InjectRepository(CustomerRole)
        private customerRoleRepo: Repository<CustomerRole>,

        @InjectPinoLogger(MailServiceService.name)
        private readonly logger: PinoLogger,

        // private readonly mailservice: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async sendMail(customerRole: CustomerRole, news: News) {
        const freeNews = news.customerRole.name === CustomerRoleEnum.USER_GUEST;

        const emailList = freeNews
            ? await this.getSubscriptionEmailList()
            : await this.getEmailList(customerRole);

        const url = this.configService.get('main.domain');

        emailList.map((email) => {
            // this.mailservice
            //     .sendMail({
            //         to: email,
            //         subject: 'Дуа шинэ мэдээ',
            //         template: './mail-template',
            //         context: {
            //             title: news.title,
            //             greeting: `Сайн байна уу, Дуа платформ шинэ мэдээ`,
            //             description: news.description,
            //             url: `${url}/category/#/news-detail/${news.id}`,
            //         },
            //     })
            //     .then((value) => {
            //         const successLog = new NewsMailLog();
            //         successLog.mailAddress = email;
            //         successLog.mailContentType = 'news';
            //         successLog.mailTitle = news.title;
            //         successLog.successfullySent = true;
            //         successLog.isCustomerEmail = !freeNews;
            //         this.newsMailLog.save(successLog);
            //     })
            //     .catch((error) => {
            //         const failLog = new NewsMailLog();
            //         failLog.mailAddress = email;
            //         failLog.mailContentType = 'news';
            //         failLog.mailTitle = news.title;
            //         failLog.successfullySent = false;
            //         failLog.isCustomerEmail = freeNews;
            //         this.newsMailLog.save(failLog);
            //         this.logger.error(`Error message: ${error.message}`, {
            //             stack: error.stack,
            //         });
            //     });
        });
    }

    private async getEmailList(customerRole: CustomerRole) {
        const roles = await this.getRolesList(customerRole);

        const customers = await this.customerRepo.find({
            where: {
                role: In(roles),
            },
        });

        return customers.map((customer) => customer.email);
    }

    private async getRolesList(role: CustomerRole) {
        const roles = await this.customerRoleRepo.find({
            where: {
                priority: LessThanOrEqual(role.priority),
            },
        });

        return roles.map((role) => role.id);
    }

    private async getSubscriptionEmailList() {
        const subscribedEmailList = await this.subscriptionRepo.find();

        return subscribedEmailList.map((sub) => sub.email);
    }
}
