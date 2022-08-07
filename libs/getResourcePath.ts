import { glob } from 'glob';

export const getResourcePath = (fileName: string): Promise<string> => {
    const resourceFolder = process.env.RESOURCE_FOLDER_LOCATION;
    const fileSearchVal = resourceFolder + '/**/' + fileName;

    return new Promise((resolve, reject) => {
        glob(fileSearchVal, (err, files) => {
            console.log(files);
            if (err) {
                reject(err);
            }

            if (files.length) {
                resolve(files[0]);
            }
        });
    });
};
