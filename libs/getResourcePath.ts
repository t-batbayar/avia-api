import { glob } from 'glob';

export const getResourcePath = (fileName: string): Promise<string> => {
    const resourceFolder = process.env.RESOURCE_FOLDER_LOCATION;
    const fileSearchVal = resourceFolder + '/**/' + fileName;

    return new Promise((resolve, reject) => {
        glob(fileSearchVal)
            .then((files) => {
                console.log(files);
                if (files.length) {
                    resolve(files[0]);
                } else {
                    reject(new Error('No files found'));
                }
            })
            .catch((err) => reject(err));
    });
};
