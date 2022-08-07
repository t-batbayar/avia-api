import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCmsUser1635929372009 implements MigrationInterface {
    name = 'UpdateCmsUser1635929372009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`cms_user\` ADD UNIQUE INDEX \`IDX_8f9701f0b9dff97e229877949d\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`cms_user\` DROP INDEX \`IDX_8f9701f0b9dff97e229877949d\``);
    }

}
