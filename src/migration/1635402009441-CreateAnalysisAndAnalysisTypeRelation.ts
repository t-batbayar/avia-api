import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAnalysisAndAnalysisTypeRelation1635402009441 implements MigrationInterface {
    name = 'CreateAnalysisAndAnalysisTypeRelation1635402009441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`content_type\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`content_link\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`content_link_target\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`content_html\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`is_public\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`analysisTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analyst\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analyst\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analyst\` CHANGE \`position\` \`position\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` CHANGE \`highlight_content\` \`highlight_content\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` CHANGE \`type\` \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD CONSTRAINT \`FK_3a548841ec3a6c4936b40a3bef9\` FOREIGN KEY (\`analysisTypeId\`) REFERENCES \`dua_platform\`.\`analysis_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP FOREIGN KEY \`FK_3a548841ec3a6c4936b40a3bef9\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` CHANGE \`type\` \`type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` CHANGE \`highlight_content\` \`highlight_content\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analyst\` CHANGE \`position\` \`position\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analyst\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analyst\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`analysisTypeId\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`is_public\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`content_html\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`content_link_target\` tinyint NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`content_link\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`content_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`title\` varchar(255) NULL`);
    }

}
