import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const multerResourceConfig = {
    dest: () => process.env.RESOURCE_FOLDER_LOCATION,
};

console.log(process.env.MAX_FILE_SIZE);

const FILE_TYPES_REGEX = {
    image: new RegExp('^.*(jpe?g|png|gif)$', 'gi'),
    video: new RegExp('^.*mp4$', 'gi'),
    // excel: new RegExp('^.*xlsx?$', 'gi'),
    // pdf: new RegExp('^.*pdf$', 'gi'),
    // mp3: new RegExp('^.*mp3$', 'gi'),
    // word: new RegExp('^.*docx?$', 'gi'),
    // ppt: new RegExp('^.*pp(t|tx|tm)$', 'gjoini'),
};

export const multerResourceOptions = (
    // type: 'image' | 'excel' | 'pdf' | 'mp3',
    location = 'resource',
) => ({
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    fileFilter: (_req: any, file: any, cb: any) => {
        if (
            file.originalname.match(FILE_TYPES_REGEX.image) ||
            file.originalname.match(FILE_TYPES_REGEX.video) ||
            // file.originalname.match(FILE_TYPES_REGEX.pdf) ||
            // file.originalname.match(FILE_TYPES_REGEX.mp3) ||
            // file.originalname.match(FILE_TYPES_REGEX.word) ||
            // file.originalname.match(FILE_TYPES_REGEX.ppt) ||
            !file
        ) {
            cb(null, true);
        } else {
            console.log('FILE UPLOAD ERROR ');
            cb(
                new HttpException(
                    `Unsupported file type ${extname(file.originalname)}`,
                    HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }
    },
    storage: diskStorage({
        destination: (_req: any, _file: any, cb: any) => {
            const uploadPath = multerResourceConfig.dest() + '/' + location;

            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }

            cb(null, uploadPath);
        },
        filename: (_req: any, file: any, cb: any) => {
            const uniqueName = nanoid(10) + extname(file.originalname);

            cb(null, uniqueName);
        },
    }),
});
