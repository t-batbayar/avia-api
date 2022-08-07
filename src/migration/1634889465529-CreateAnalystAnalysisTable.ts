import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAnalystAnalysisTable1634889465529 implements MigrationInterface {
    name = 'CreateAnalystAnalysisTable1634889465529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dua_platform\`.\`analyst\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`email\` varchar(255) NULL, \`position\` varchar(255) NULL, \`image_path\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dua_platform\`.\`analysis\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`highlight_content\` varchar(255) NULL, \`type\` varchar(255) NULL, \`content_type\` varchar(255) NULL, \`content_link\` varchar(255) NULL, \`content_link_target\` tinyint NULL DEFAULT 1, \`content_html\` longtext NULL, \`is_featured\` tinyint NULL DEFAULT 0, \`is_public\` tinyint NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`publish_at\` datetime NULL, \`expire_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dua_platform\`.\`analysis_analyst_analyst\` (\`analysisId\` int NOT NULL, \`analystId\` int NOT NULL, INDEX \`IDX_7d99adcc8bb222063963fb809d\` (\`analysisId\`), INDEX \`IDX_c466f0c0f1b217d9e52c6a3a39\` (\`analystId\`), PRIMARY KEY (\`analysisId\`, \`analystId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`news\` CHANGE \`publish_at\` \`publish_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`news\` CHANGE \`expire_at\` \`expire_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis_analyst_analyst\` ADD CONSTRAINT \`FK_7d99adcc8bb222063963fb809d3\` FOREIGN KEY (\`analysisId\`) REFERENCES \`dua_platform\`.\`analysis\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis_analyst_analyst\` ADD CONSTRAINT \`FK_c466f0c0f1b217d9e52c6a3a39b\` FOREIGN KEY (\`analystId\`) REFERENCES \`dua_platform\`.\`analyst\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis_analyst_analyst\` DROP FOREIGN KEY \`FK_c466f0c0f1b217d9e52c6a3a39b\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`analysis_analyst_analyst\` DROP FOREIGN KEY \`FK_7d99adcc8bb222063963fb809d3\``);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`news\` CHANGE \`expire_at\` \`expire_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`news\` CHANGE \`publish_at\` \`publish_at\` datetime NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_c466f0c0f1b217d9e52c6a3a39\` ON \`dua_platform\`.\`analysis_analyst_analyst\``);
        await queryRunner.query(`DROP INDEX \`IDX_7d99adcc8bb222063963fb809d\` ON \`dua_platform\`.\`analysis_analyst_analyst\``);
        await queryRunner.query(`DROP TABLE \`dua_platform\`.\`analysis_analyst_analyst\``);
        await queryRunner.query(`DROP TABLE \`dua_platform\`.\`analysis\``);
        await queryRunner.query(`DROP TABLE \`dua_platform\`.\`analyst\``);
    }

}
