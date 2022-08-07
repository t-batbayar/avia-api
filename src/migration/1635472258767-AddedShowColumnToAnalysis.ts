import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedShowColumnToAnalysis1635472258767
    implements MigrationInterface
{
    name = 'AddedShowColumnToAnalysis1635472258767';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`analysis_type\` ADD \`show\` tinyint NULL DEFAULT 1`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`analysis_type\` DROP COLUMN \`show\``,
        );
    }
}
