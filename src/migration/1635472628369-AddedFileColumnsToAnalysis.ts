import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedFileColumnsToAnalysis1635472628369 implements MigrationInterface {
    name = 'AddedFileColumnsToAnalysis1635472628369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`file_xlsx\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`file_pdf\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`file_word\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`file_ppt\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`file_jpg\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`file_mp3\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`file_mp3\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`file_jpg\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`file_ppt\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`file_word\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`file_pdf\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`file_xlsx\``);
    }

}
