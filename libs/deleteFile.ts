import * as fs from 'fs';
import { join } from 'path';

export const deleteFile = (path: string) => {
    const filePath = join(__dirname, '..', '..', 'public', 'resource', path);

    fs.unlink(filePath, (error) => {
        if (error) {
            console.warn(
                'There was an error while trying to delete the file',
                error,
            );
        }
    });
};

export const deleteFileByPath = (path: string) => {
    fs.unlink(path, (error) => {
        if (error) {
            console.warn(
                'There was an error while trying to delete the file',
                error,
            );
        }
    });
};

export const deleteResourceFile = (filename: string) => {
    const filePath = process.env.RESOURCE_FOLDER_LOCATION + '/' + filename;

    fs.unlink(filePath, (error) => {
        if (error) {
            console.error(
                'There was an error while trying to delete the file',
                error,
            );
        }
    });
};
