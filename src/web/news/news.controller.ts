import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindNewsDto } from './dto/find-news.dto';
import { FindRelatedNewsQueryDto } from './dto/find-related-news.dto';
import { NewsSearchDto } from './dto/news-search.dto';
import { NewsService } from './news.service';

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get('get-news-by-filter')
    async search(@Query() { filter, page }) {
        return this.newsService.search(filter, page);
    }

    @Get('get-latest-posts')
    getLatestPosts() {
        return this.newsService.getLatestNews();
    }

    @Get(':id/others')
    getRelatedPosts(
        @Param('id') id: string,
        @Query() { maxItemSize }: FindRelatedNewsQueryDto,
    ) {
        return this.newsService.getRelatedNews(+id, maxItemSize);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsService.findOne(+id);
    }

    @Get()
    findAll(@Query() { type, page, perPage, isFeatured }: FindNewsDto) {
        return this.newsService.findAll(type, page, perPage, isFeatured);
    }
}
