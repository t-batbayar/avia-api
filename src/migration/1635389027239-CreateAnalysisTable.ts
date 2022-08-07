import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAnalysisTable1635389027239 implements MigrationInterface {
    name = 'CreateAnalysisTable1635389027239';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`dua_platform\`.\`analysis_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`display_order\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE \`dua_platform\`.\`analysis_type\``,
        );
    }
}
