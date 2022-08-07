import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterPage } from '../../cms/register-page/entities/register-page.entity';

@Injectable()
export class RegisterPageService {
    constructor(
        @InjectRepository(RegisterPage)
        private readonly registerPageRepo: Repository<RegisterPage>,
    ) {}

    async getPage() {
        const pageData = await this.registerPageRepo.findOneOrFail();

        if (!pageData) {
            throw new NotFoundException(
                'Sorry there is no data in the database',
            );
        }

        return pageData;
    }
}
