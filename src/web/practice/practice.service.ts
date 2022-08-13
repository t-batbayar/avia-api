import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentStatus } from '../../cms/payment-status/entities/payment-status.entity';
import { Practice } from '../../cms/practice/entities/practice.entity';
import { User } from '../../cms/users/entities/user.entity';

@Injectable()
export class PracticeService {
    constructor(
        @InjectRepository(Practice)
        private practiceRepo: Repository<Practice>,

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(PaymentStatus)
        private paymentStatusRepo: Repository<PaymentStatus>,

        private readonly configService: ConfigService,
    ) {}

    async findAll(headers: { [key: string]: string }) {
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

        const practices = await this.practiceRepo.find({
            order: {
                id: 'ASC',
            },
        });

        const paymentStatus = await this.paymentStatusRepo.findOne({
            order: {
                id: 'DESC',
            },
        });

        let result = [...practices];
        if (!paymentStatus.paymentEnabled) {
            return result;
        } else if (!userIsActive) {
            result = practices.filter((practice) => {
                return freeLetters.includes(practice.useg.toUpperCase());
            });
        }

        return result;
    }
}
