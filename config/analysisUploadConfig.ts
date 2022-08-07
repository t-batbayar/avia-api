import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname, join } from 'path';

export const multerAnalysisConfig = {
    dest: () => process.env.RESOURCE_FOLDER_LOCATION,
};

const FILE_TYPES_REGEX = {
    // image: new RegExp('^.*(jpe?g|png|gif)$', 'gi'),
    // excel: new RegExp('^.*xlsx$', 'gi'),
    pdf: new RegExp('^.*pdf$', 'gi'),
    // mp3: new RegExp('^.*mpeg$', 'gi'),
    // word: new RegExp('^.*doc?x$', 'gi'),
    // ppt: new RegExp('^.*ppt$', 'gi'),
};

export const multerAnalysisOptions = (
    // type: 'image' | 'excel' | 'pdf' | 'mp3',
    location = '',
) => ({
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    fileFilter: (_req: any, file: any, cb: any) => {
        if (
            file.mimetype.match(FILE_TYPES_REGEX.pdf) ||
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
            /* FILE UPLOAD LOCATION BASED ON USER ROLE */
            let roleBasedPath = '';

            if (_req.body?.customerRole) {
                switch (+_req.body.customerRole) {
                    case 1:
                        roleBasedPath = 'ROLE_GOLOMT_ADVANCED';
                        break;
                    case 2:
                        roleBasedPath = 'ROLE_GOLOMT_BASE';
                        break;
                    case 3:
                        roleBasedPath = 'ROLE_USER_PAID';
                        break;
                    case 4:
                        roleBasedPath = 'ROLE_USER_FREE';
                        break;
                    case 5:
                        roleBasedPath = 'ROLE_USER_GUEST';
                        break;
                    default:
                        throw new Error(
                            'analysisUploadConfig Unknown USER ROLE',
                        );
                }
            }
            const uploadPath = join(multerAnalysisConfig.dest(), roleBasedPath);

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
