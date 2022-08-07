import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewsTable1634814029117 implements MigrationInterface {
    name = 'CreateNewsTable1634814029117';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`dua_platform\`.\`news\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`description\` varchar(255) NULL, \`body\` longtext NULL, \`img_url\` varchar(255) NULL, \`is_featured\` tinyint NULL DEFAULT 0, \`type\` varchar(255) NULL, \`publish_at\` datetime NULL, \`expire_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_b741244d1049e2eec7c0065fa9\` (\`title\`), INDEX \`IDX_98c574051b675c65553765003f\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_98c574051b675c65553765003f\` ON \`dua_platform\`.\`news\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_b741244d1049e2eec7c0065fa9\` ON \`dua_platform\`.\`news\``,
        );
        await queryRunner.query(`DROP TABLE \`dua_platform\`.\`news\``);
    }
}
