import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from '../../cms/review/entities/review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepo: Repository<Review>,
    ) {}

    async getReview() {
        return await this.reviewRepo.find();
    }
}
