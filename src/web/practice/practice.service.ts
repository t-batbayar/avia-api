import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

import { PaymentStatus } from '../../cms/payment-status/entities/payment-status.entity';
import { Practice } from '../../cms/practice/entities/practice.entity';
import { User } from '../../cms/users/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class PracticeService {
    constructor(
        @InjectRepository(Practice)
        private practiceRepo: EntityRepository<Practice>,

        @InjectRepository(User)
        private userRepo: EntityRepository<User>,

        @InjectRepository(PaymentStatus)
        private paymentStatusRepo: EntityRepository<PaymentStatus>,

        private readonly configService: ConfigService,

        @Inject(REQUEST) private request: any,
    ) {}

    async findAll(headers: { [key: string]: string }): Promise<Practice[]> {
        const userEmail = headers['user-email'];
        const userLoginType = headers['user-login-type'];
        const userDeviceId = headers['user-device-id'];

        const user = await this.userRepo.findOne({
            email: userEmail,
            deviceId: userDeviceId,
            loginType: userLoginType,
        });

        if (!user) {
            throw new NotFoundException("Sorry couldn't find the user");
        }

        if (user.userIsBlocked) {
            return [];
        }

        let freeLetters = this.configService.get('main.freeLetters');

        if (freeLetters) {
            freeLetters = freeLetters
                .split(',')
                .map((letter) => letter.toUpperCase());
        } else {
            freeLetters = [];
        }

        let userIsActive = false;

        if (user.purchaseEndDate && user.purchaseEndDate > new Date()) {
            userIsActive = true;
        }

        const practices = await this.practiceRepo.findAll({
            orderBy: {
                order: 'ASC',
            },
        });

        const paymentStatus = await this.paymentStatusRepo.findOne({});

        const result = practices.map((p) => {
            const clonedPractice = { ...p, isActive: false };
            if (
                !paymentStatus.paymentEnabled ||
                (paymentStatus.paymentEnabled && userIsActive)
            ) {
                clonedPractice.isActive = true;
                return clonedPractice;
            }

            if (freeLetters.includes(p.useg)) {
                clonedPractice.isActive = true;
            }

            return clonedPractice;
        });

        // if (!paymentStatus.paymentEnabled) {
        //     return result;
        // } else if (!userIsActive) {
        //     result = practices.filter((practice) => {
        //         return freeLetters.includes(practice.useg.toUpperCase());
        //     });
        // }

        return result;
    }
}
