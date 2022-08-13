import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    async getBankList() {
        const dummyData = [
            {
                bankType: 'khan',
                deeplink: 'khanbank://',
                name: 'Khan bank',
            },
            {
                bankType: 'state',
                deeplink: 'statebank://',
                name: 'State bank',
            },
            {
                bankType: 'khas',
                deeplink: 'khasbank://',
                name: 'Xac bank',
            },
            {
                bankType: 'tdbm',
                deeplink: 'tdbm://',
                name: 'TDBM',
            },
            {
                bankType: 'mostmoney',
                deeplink: 'mostmoney://',
                name: 'Most Money',
            },
            {
                bankType: 'chingiskhan',
                deeplink: 'chingiskhan://',
                name: 'Chingis Khan bank',
            },
            {
                bankType: 'capitron',
                deeplink: 'capitron://',
                name: 'Capitron bank',
            },
            {
                bankType: 'bogd',
                deeplink: 'bogdbank://',
                name: 'Bogd bank',
            },
        ];

        return dummyData;
    }
}
