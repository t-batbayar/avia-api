import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createNotFoundMessage } from '../../../libs/createNotFoundMessage';
import { deleteFile } from '../../../libs/deleteFile';
import { editFilePath } from '../../../libs/editFilePath';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    async create(createReviewDto: CreateReviewDto, file: Express.Multer.File) {
        const review = new Review();
        review.name = createReviewDto.name;
        review.position = createReviewDto.position;
        review.quote = createReviewDto.quote;

        if (file) {
            review.imagePath = editFilePath(file.path);
        }

        return await this.reviewRepository.save(review);
    }

    findAll(): Promise<Review[]> {
        return this.reviewRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        const review = await this.reviewRepository.findOne(id);

        if (!review) {
            throw new NotFoundException(createNotFoundMessage('Review', id));
        }

        return review;
    }

    async update(id: number, updateReviewDto: UpdateReviewDto, file) {
        const review = await this.reviewRepository.findOne(id);

        if (!review) {
            throw new NotFoundException(createNotFoundMessage('Review', id));
        }

        review.name = updateReviewDto.name;
        review.position = updateReviewDto.position;
        review.quote = updateReviewDto.quote;

        if (file) {
            deleteFile(review.imagePath);
            review.imagePath = editFilePath(file.path);
        }

        return await this.reviewRepository.save(review);
    }

    async remove(id: number) {
        const review = await this.reviewRepository.findOne(id);

        if (!review) {
            throw new NotFoundException(createNotFoundMessage('Review', id));
        }

        if (review.imagePath) {
            deleteFile(review.imagePath);
        }

        return await this.reviewRepository.delete(id);
    }
}
