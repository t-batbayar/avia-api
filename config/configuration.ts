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
    freeLetters: process.env.FREE_LETTERS,
    qpayUrl:
        process.env.ENVIRONMENT === process.env.ENVIRONMENT_PROD
            ? process.env.QPAY_URL
            : process.env.QPAY_TEST_URL,
    qpayUsername:
        process.env.ENVIRONMENT === process.env.ENVIRONMENT_PROD
            ? process.env.QPAY_USERNAME
            : process.env.QPAY_TEST_USERNAME,
    qpayPassword:
        process.env.ENVIRONMENT === process.env.ENVIRONMENT_PROD
            ? process.env.QPAY_PASSWORD
            : process.env.QPAY_TEST_PASSWORD,
    qpayInvoiceCode:
        process.env.ENVIRONMENT === process.env.ENVIRONMENT_PROD
            ? process.env.QPAY_INVOICE_CODE
            : process.env.QPAY_TEST_INVOICE_CODE,
}));
