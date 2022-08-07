import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { compare, hash } from 'bcrypt';
import { customAlphabet, nanoid, urlAlphabet } from 'nanoid';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { CustomerService } from '../../cms/customer/customer.service';
import { FrontApiResponse } from '../../common/models/response/front-api.response';
import { CheckPasswordDto } from './dto/check-password.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerPasswordDto } from './dto/create-password.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Customer } from './entities/customer.entity';
import {
    CustomerRole,
    CustomerRoleEnum,
} from './entities/customer-role.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepo: Repository<Customer>,

        @InjectRepository(CustomerRole)
        private readonly customerRoleRepo: Repository<CustomerRole>,

        private readonly mailservice: MailerService,

        private readonly configService: ConfigService,

        @InjectPinoLogger(CustomerService.name)
        private readonly logger: PinoLogger,
    ) {}

    async create(
        createCustomerDto: CreateCustomerDto,
    ): Promise<FrontApiResponse> {
        const result = new FrontApiResponse('success');
        try {
            const {
                firstName,
                lastName,
                email,
                register: registerNumber,
                phone,
            } = createCustomerDto;

            const foundCustomer = await this.customerRepo.findOne({
                where: {
                    email,
                },
            });

            if (foundCustomer) {
                throw new Error('email duplicated');
            }

            const customer = new Customer();
            customer.firstName = firstName;
            customer.lastName = lastName;
            customer.email = email;
            customer.registerNumber = registerNumber;
            customer.phone = phone;

            const nanoid = customAlphabet(urlAlphabet, 20);

            const verifyToken = nanoid();
            customer.verifyToken = verifyToken;
            customer.password = await this.hashPassword(nanoid());

            const customerType = email.endsWith('@golomtbank.com')
                ? CustomerRoleEnum.GOLOMT_BASE
                : CustomerRoleEnum.USER_FREE;

            const customerRole = await this.customerRoleRepo.findOne({
                where: {
                    name: customerType,
                },
            });

            if (!customerType) {
                throw new Error(
                    `Couldn't find the ${customerType} from the database`,
                );
            }

            customer.role = customerRole;
            await this.customerRepo.save(customer);

            const url = this.configService.get('main.domain');
            this.mailservice
                .sendMail({
                    to: email,
                    subject: 'ДУА платформ бүртгэл',
                    template: './mail-template',
                    context: {
                        title: 'ДУА платформ бүртгэл баталгаажуулалт',
                        greeting: `Сайн байна уу ${customer.lastName} ${customer.firstName}.`,
                        description: `Эдийн засгийн мэдээ мэдээллийн нэгдсэн цэг ДУА судалгааны платформд бүртгүүлсэн таньд баярлалаа. Та доорх холбоосоор өөрийн бүртгэлээ баталгаажуулна уу.`,
                        url: `${url}/customer-activate?token=${customer.verifyToken}`,
                    },
                })
                .catch((error) => {
                    this.logger.error(`Error message: ${error.message}`, {
                        stack: error.stack,
                    });
                });

            return result;
        } catch (error) {
            result.status = 'fail';
            result.message = error.message;
            return result;
        }
    }

    async checkToken(token: string) {
        const result = new FrontApiResponse('success');

        try {
            if (!token.trim()) {
                throw new Error('invalid token');
            }

            const customer = await this.customerRepo.findOne({
                where: {
                    verifyToken: token,
                    // enabled: false,
                },
            });

            if (!customer) {
                throw new Error('customer not found');
            }

            const validTokenValidationDate =
                customer.verifyTokenCreatedAt.getTime() +
                1 * 24 * 60 * 60 * 1000;

            if (new Date().getTime() > validTokenValidationDate) {
                result.status = 'fail';
                result.message =
                    'Нууц үг шинэчлэх токений хугацаа дууссан байна';
                return result;
            }

            const activatedCustomer = await this.activateCustomer(customer);

            result.result = activatedCustomer;
            return result;
        } catch (error) {
            console.error(error);
            result.status = 'fail';
            result.message = error.message;
            return result;
        }
    }

    async createPassword(body: CreateCustomerPasswordDto) {
        const result = new FrontApiResponse('success');

        try {
            const { username, password } = body;

            const customer = await this.customerRepo.findOne({
                where: {
                    email: username,
                },
            });

            if (!customer) {
                throw new Error('Customer not found');
            }

            customer.password = await this.hashPassword(password);

            result.result = await this.customerRepo.save(customer);
            return result;
        } catch (error) {
            result.status = 'fail';
            result.message = error.message;
            return result;
        }
    }

    async findAll(email: string) {
        const result = new FrontApiResponse('success');
        try {
            const customers = await this.customerRepo.find({
                where: {
                    email: email,
                },
            });

            customers.map((customer) => {
                delete customer.password;
                return customer;
            });

            return customers;
        } catch (error) {
            result.status = 'fail';
            result.message = error.message;
            return result;
        }
    }

    async checkPassword(checkPasswordDto: CheckPasswordDto) {
        const response = new FrontApiResponse('success');
        try {
            const customer = await this.customerRepo.findOne({
                where: {
                    email: checkPasswordDto.username,
                },
            });

            if (!customer) {
                response.status = 'fail';
                response.message = 'customer not found';
                throw new Error('customer not found');
            }

            const passwordMatched = await compare(
                checkPasswordDto.password,
                customer.password,
            );

            response.result = passwordMatched;

            return response;
        } catch (error) {
            response.status = 'fail';
            response.message = error.message;
            return response;
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} customer`;
    }

    update(id: number, updateCustomerDto: UpdateCustomerDto) {
        return `This action updates a #${id} customer`;
    }

    remove(id: number) {
        return `This action removes a #${id} customer`;
    }

    async resetPassword(email: string) {
        const result = new FrontApiResponse('success');
        try {
            const customer = await this.customerRepo.findOne({
                where: {
                    email,
                },
            });

            if (!customer) {
                result.status = 'fail';
                result.message = 'customer not found';
                result.result = null;

                throw new BadRequestException(result, result.message);
            }

            const token = nanoid(20);
            customer.verifyToken = token;
            const currentDate = new Date();
            customer.verifyTokenCreatedAt = currentDate;
            customer.verifyTokenRequestedAt = currentDate;

            const updatedCustomer = await this.customerRepo.save(customer);

            const url = this.configService.get('main.domain');
            this.mailservice
                .sendMail({
                    to: email,
                    subject: 'ДУА платформ бүртгэл',
                    template: './mail-template',
                    context: {
                        title: 'ДУА платформ нууц үг сэргээх',
                        greeting: `Сайн байна уу ${customer.lastName} ${customer.firstName}.`,
                        description: `Та дараах холбоосоор орж нууц үгээ сэргээнэ үү.`,
                        url: `${url}/reset-password?token=${customer.verifyToken}`,
                    },
                })
                .catch((error) => {
                    this.logger.error(`Error message: ${error.message}`, {
                        stack: error.stack,
                    });
                });

            return result;
        } catch (error) {
            this.logger.error(`Error message: ${error.message}`, {
                stack: error.stack,
            });
            result.status = 'fail';
            result.message = error.message;
            return result;
        }
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        const result = new FrontApiResponse('success');
        try {
            const customer = await this.customerRepo.findOne({
                where: {
                    email: updatePasswordDto.email,
                },
            });

            if (!customer) {
                result.status = 'fail';
                result.message = 'customer not found';
                result.result = null;

                throw new BadRequestException(result, result.message);
            }

            const token = nanoid(20);
            customer.verifyToken = token;
            const currentDate = new Date();
            customer.verifyTokenCreatedAt = currentDate;
            customer.verifyTokenRequestedAt = currentDate;

            const passwordMatched = await compare(
                updatePasswordDto.oldPassword,
                customer.password,
            );

            if (!passwordMatched) {
                result.status = 'fail';
                result.message = 'current password is incorrect';
                result.result = null;

                throw new BadRequestException(result, result.message);
            }

            // if (
            //     updatePasswordDto.newPassword !==
            //     updatePasswordDto.confirmNewPassword
            // ) {
            //     result.status = 'fail';
            //     result.message =
            //         'Password and Confirmation Password must match';
            //     result.result = null;
            //     throw new BadRequestException(result, result.message);
            // }

            customer.password = await this.hashPassword(
                updatePasswordDto.newPassword,
            );

            result.result = await this.customerRepo.save(customer);
        } catch (error) {
            console.error(error);
            result.status = 'fail';
            result.message = error.message;
        }
        return result;
    }

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, 12);
    }

    private async activateCustomer(customer: Customer) {
        customer.enabled = true;
        // customer.verifyToken = null;
        customer.verifyTokenVerifiedAt = new Date();
        return await this.customerRepo.save(customer);
    }
}
