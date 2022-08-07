import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCmsUser1635929057324 implements MigrationInterface {
    name = 'CreateCmsUser1635929057324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dua_platform\`.\`cms_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'PUBLISHER', 'ANALYST') NOT NULL DEFAULT 'PUBLISHER', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`dua_platform\`.\`cms_user\``);
    }

}
