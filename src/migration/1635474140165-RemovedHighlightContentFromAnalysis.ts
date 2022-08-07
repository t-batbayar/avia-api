import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedHighlightContentFromAnalysis1635474140165
    implements MigrationInterface
{
    name = 'RemovedHighlightContentFromAnalysis1635474140165';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`highlight_content\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`type\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`analysis\` DROP COLUMN \`is_featured\``,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`type\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`analysis\` ADD \`highlight_content\` varchar(255) NOT NULL`,
        );
    }
}
