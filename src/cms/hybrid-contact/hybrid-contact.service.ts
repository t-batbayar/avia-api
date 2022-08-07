import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { deleteFile } from '../../../libs/deleteFile';
import { editFilePath } from '../../../libs/editFilePath';
import { CreateHybridContactDto } from './dto/create-hybrid-contact.dto';
import { UpdateHybridContactDto } from './dto/update-hybrid-contact.dto';
import { HybridContact } from './entities/hybrid-contact.entity';

@Injectable()
export class HybridContactService {
    constructor(
        @InjectRepository(HybridContact)
        private readonly hybridContactRepo: Repository<HybridContact>,
    ) {}

    async create(
        createHybridContactDto: CreateHybridContactDto,
        file: Express.Multer.File,
    ) {
        const hybridContact = new HybridContact();
        hybridContact.name = createHybridContactDto.name;
        hybridContact.bio = createHybridContactDto.bio;
        hybridContact.email = createHybridContactDto.email;
        hybridContact.phone = createHybridContactDto.phone;

        if (file) {
            hybridContact.imagePath = editFilePath(file.path);
        }

        return await this.hybridContactRepo.save(createHybridContactDto);
    }

    async findAll() {
        return await this.hybridContactRepo.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        const hybridContact = this.hybridContactRepo.findOne(id);

        if (!hybridContact) {
            throw new BadRequestException(`Data not found with id ${id}`);
        }

        return hybridContact;
    }

    async update(
        id: number,
        updateHybridContactDto: UpdateHybridContactDto,
        file: Express.Multer.File,
    ) {
        const hybridContact = await this.hybridContactRepo.findOne(id);

        if (!hybridContact) {
            throw new BadRequestException(`Data not found with id ${id}`);
        }

        hybridContact.name = updateHybridContactDto.name;
        hybridContact.email = updateHybridContactDto.email;
        hybridContact.phone = updateHybridContactDto.phone;
        hybridContact.bio = updateHybridContactDto.bio;

        if (file) {
            if (hybridContact.imagePath) {
                deleteFile(hybridContact.imagePath);
            }
            hybridContact.imagePath = editFilePath(file.path);
        }

        return await this.hybridContactRepo.save(hybridContact);
    }

    async remove(id: number) {
        return await this.hybridContactRepo.delete({
            id,
        });
    }
}
