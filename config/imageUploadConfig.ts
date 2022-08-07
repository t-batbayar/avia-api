import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';

export const multerImageConfig = {
    dest: () => process.env.PUBLIC_FOLDER_LOCATION,
};

const FILE_TYPES_REGEX = {
    image: new RegExp('^.*(jpe?g|png|gif)$', 'gi'),
    // excel: new RegExp('^.*xlsx$', 'gi'),
    // pdf: new RegExp('^.*pdf$', 'gi'),
    // mp3: new RegExp('^.*mpeg$', 'gi'),
    // word: new RegExp('^.*doc?x$', 'gi'),
    // ppt: new RegExp('^.*ppt$', 'gi'),
};

export const multerImageOptions = (
    // type: 'image' | 'excel' | 'pdf' | 'mp3',
    location = '',
) => ({
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    fileFilter: (_req: any, file: any, cb: any) => {
        if (
            file.mimetype.match(FILE_TYPES_REGEX.image) ||
            // file.mimetype.match(FILE_TYPES_REGEX.excel) ||
            // file.mimetype.match(FILE_TYPES_REGEX.pdf) ||
            // file.mimetype.match(FILE_TYPES_REGEX.mp3) ||
            !file
        ) {
            cb(null, true);
        } else {
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
            const uploadPath = multerImageConfig.dest() + '/' + location;

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
