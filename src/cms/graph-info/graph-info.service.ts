import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGraphInfoDto } from './dto/create-graph-info.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { SectorMainInfo } from './entities/sector-main-info.entity';

@Injectable()
export class GraphInfoService {
    constructor(
        @InjectRepository(SectorMainInfo)
        private readonly sectorMainInfoRepo: Repository<SectorMainInfo>,
    ) {}

    create(createGraphInfoDto: CreateGraphInfoDto) {
        return 'This action adds a new graphInfo';
    }

    findAllSector() {
        return this.sectorMainInfoRepo.find();
        // return `This action returns all graphInfo`;
    }

    async getSector(id: number) {
        const sectorInfo = await this.sectorMainInfoRepo.findOne(id);

        if (!sectorInfo) {
            throw new NotFoundException(
                `There is sector info data with the id ${id}`,
            );
        }

        return sectorInfo;
    }

    async updateSector(id: number, updateSectorDto: UpdateSectorDto) {
        const sectorInfo = await this.sectorMainInfoRepo.findOne(id);

        if (!sectorInfo) {
            throw new NotFoundException(
                `There is sector info data with the id ${id}`,
            );
        }

        sectorInfo.horizontalName = updateSectorDto.horizontalName;
        sectorInfo.verticalName = updateSectorDto.verticalName;

        return await this.sectorMainInfoRepo.save(sectorInfo);
    }

    findOne(id: number) {
        return `This action returns a #${id} graphInfo`;
    }

    // update(id: number, updateGraphInfoDto: UpdateGraphInfoDto) {
    //     return `This action updates a #${id} graphInfo`;
    // }

    remove(id: number) {
        return `This action removes a #${id} graphInfo`;
    }
}
