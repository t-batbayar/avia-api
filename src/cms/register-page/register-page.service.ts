import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFile } from '../../../libs/deleteFile';
import { editFilePath } from '../../../libs/editFilePath';
import { CreateRegisterPageDto } from './dto/create-register-page.dto';
import { UpdateRegisterPageDto } from './dto/update-register-page.dto';
import { RegisterPage } from './entities/register-page.entity';

@Injectable()
export class RegisterPageService {
    constructor(
        @InjectRepository(RegisterPage)
        private registerPageRepository: Repository<RegisterPage>,
    ) {}

    async create(
        createRegisterPageDto: CreateRegisterPageDto,
        file: Express.Multer.File,
    ) {
        const pageData = new RegisterPage();

        if (file) {
            pageData.imgUrl = editFilePath(file.path);
        }

        return await this.registerPageRepository
            .save(pageData)
            .catch((err: any) => {
                deleteFile(pageData.imgUrl);
                throw new Error(err);
            });
    }

    async findAll() {
        return await this.registerPageRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        const registerPage = await this.registerPageRepository.findOne(id);

        if (!registerPage) {
            throw new NotFoundException(
                createNotFoundMessage('Register page', id),
            );
        }

        return registerPage;
    }

    async update(
        id: number,
        updateRegisterPageDto: UpdateRegisterPageDto,
        file: Express.Multer.File,
    ) {
        const registerPage = await this.registerPageRepository.findOne(id);

        if (!registerPage) {
            throw new NotFoundException(
                createNotFoundMessage('register-page', id),
            );
        }

        if (file) {
            if (registerPage.imgUrl) {
                deleteFile(registerPage.imgUrl);
            }
            registerPage.imgUrl = editFilePath(file.path);
        }

        return await this.registerPageRepository.save(registerPage);
    }

    remove(id: number) {
        return `This action removes a #${id} registerPage`;
    }
}
