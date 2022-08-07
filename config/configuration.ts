import { registerAs } from '@nestjs/config';

export const CONFIG_NAME_MAIN = 'main';

export default registerAs(CONFIG_NAME_MAIN, () => ({
    inDevelopment: process.env.ENVIRONMENT === process.env.ENVIRONMENT_PROD,
    port: parseInt(process.env.PORT, 10) || 13000,
    title: process.env.MAIN_TITLE,
    swaggerDescription: process.env.SWAGGER_DESCRIPTION,
    domain: process.env.DOMAIN,
    apiDomain: process.env.API_URL,
    resourceFolder: process.env.RESOURCE_FOLDER_LOCATION,
}));
