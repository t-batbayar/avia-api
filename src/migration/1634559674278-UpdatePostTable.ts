import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePostTable1634559674278 implements MigrationInterface {
    name = 'UpdatePostTable1634559674278';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` DROP FOREIGN KEY \`FK_FA7ACAA993CB796C\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` DROP FOREIGN KEY \`FK_90CAEA5B3DA5256D\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP FOREIGN KEY \`FK_65BE75CA3DA5256D\``);
        // await queryRunner.query(`DROP INDEX \`IDX_FA7ACAA993CB796C\` ON \`dua_platform\`.\`g_analyse\``);
        // await queryRunner.query(`DROP INDEX \`IDX_90CAEA5B3DA5256D\` ON \`dua_platform\`.\`g_analyst\``);
        // await queryRunner.query(`DROP INDEX \`UNIQ_65BE75CA2B36786B\` ON \`dua_platform\`.\`g_post\``);
        // await queryRunner.query(`DROP INDEX \`IDX_65BE75CA3DA5256D\` ON \`dua_platform\`.\`g_post\``);
        // await queryRunner.query(`DROP INDEX \`UNIQ_527D5D85F85E0677\` ON \`dua_platform\`.\`g_cms_user\``);
        // await queryRunner.query(`DROP INDEX \`UNIQ_527D5D857BA2F5EB\` ON \`dua_platform\`.\`g_cms_user\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` DROP COLUMN \`is_published\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` DROP COLUMN \`file_id\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` DROP COLUMN \`image_id\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`image_id\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`username\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`roles\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`api_token\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`title\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`body\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`img_url\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`is_featured\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`type\``);
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`created_at\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`updated_at\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`publish_at\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`expire_at\``,
        );
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` ADD \`image_path\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`title\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`body\` longtext NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`img_url\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`is_featured\` tinyint NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`type\` varchar(255) NULL`);
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`publish_at\` datetime NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`expire_at\` datetime NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`firstname\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`lastname\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`email\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`password\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`role\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`name\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`title\` \`title\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` DROP COLUMN \`highlight_content\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` ADD \`highlight_content\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`content_link_target\` \`content_link_target\` tinyint NULL DEFAULT 'true'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_featured\` \`is_featured\` tinyint NULL DEFAULT 'false'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_public\` \`is_public\` tinyint NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`title\` \`title\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`content_link_target\` \`content_link_target\` tinyint NULL DEFAULT 'true'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_featured\` \`is_featured\` tinyint NULL DEFAULT 'false'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_public\` \`is_public\` tinyint NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        // await queryRunner.query(`CREATE INDEX \`IDX_38fd05d6962658f9b4627e11e2\` ON \`dua_platform\`.\`g_analyse\` (\`type\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DROP INDEX \`IDX_38fd05d6962658f9b4627e11e2\` ON \`dua_platform\`.\`g_analyse\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`updated_at\` \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`created_at\` \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`updated_at\` \`updated_at\` datetime(0) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_public\` \`is_public\` tinyint(1) NOT NULL DEFAULT '1'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_featured\` \`is_featured\` tinyint(1) NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`content_link_target\` \`content_link_target\` tinyint(1) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`title\` \`title\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`updated_at\` \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`created_at\` \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`updated_at\` \`updated_at\` datetime(0) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_public\` \`is_public\` tinyint(1) NOT NULL DEFAULT '1'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`is_featured\` \`is_featured\` tinyint(1) NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`content_link_target\` \`content_link_target\` tinyint(1) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` DROP COLUMN \`highlight_content\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` ADD \`highlight_content\` longtext NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` CHANGE \`title\` \`title\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`name\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`updated_at\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`created_at\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`role\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`password\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`email\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`lastname\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` DROP COLUMN \`firstname\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`updated_at\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`created_at\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`expire_at\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`publish_at\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`type\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`is_featured\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`img_url\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`body\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` DROP COLUMN \`title\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` DROP COLUMN \`image_path\``);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`expire_at\` datetime NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`publish_at\` datetime NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`updated_at\` datetime(0) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`created_at\` datetime(0) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`type\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`is_featured\` tinyint(1) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`img_url\` longtext NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`body\` longtext NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`title\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`api_token\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`roles\` json NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_cms_user\` ADD \`username\` varchar(180) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD \`image_id\` int NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` ADD \`image_id\` int NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` ADD \`file_id\` int NULL`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` ADD \`is_published\` tinyint(1) NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`CREATE UNIQUE INDEX \`UNIQ_527D5D857BA2F5EB\` ON \`dua_platform\`.\`g_cms_user\` (\`api_token\`)`);
        // await queryRunner.query(`CREATE UNIQUE INDEX \`UNIQ_527D5D85F85E0677\` ON \`dua_platform\`.\`g_cms_user\` (\`username\`)`);
        // await queryRunner.query(`CREATE INDEX \`IDX_65BE75CA3DA5256D\` ON \`dua_platform\`.\`g_post\` (\`image_id\`)`);
        // await queryRunner.query(`CREATE UNIQUE INDEX \`UNIQ_65BE75CA2B36786B\` ON \`dua_platform\`.\`g_post\` (\`title\`)`);
        // await queryRunner.query(`CREATE INDEX \`IDX_90CAEA5B3DA5256D\` ON \`dua_platform\`.\`g_analyst\` (\`image_id\`)`);
        // await queryRunner.query(`CREATE INDEX \`IDX_FA7ACAA993CB796C\` ON \`dua_platform\`.\`g_analyse\` (\`file_id\`)`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_post\` ADD CONSTRAINT \`FK_65BE75CA3DA5256D\` FOREIGN KEY (\`image_id\`) REFERENCES \`dua_platform\`.\`g_media_object\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyst\` ADD CONSTRAINT \`FK_90CAEA5B3DA5256D\` FOREIGN KEY (\`image_id\`) REFERENCES \`dua_platform\`.\`g_media_object\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        // await queryRunner.query(`ALTER TABLE \`dua_platform\`.\`g_analyse\` ADD CONSTRAINT \`FK_FA7ACAA993CB796C\` FOREIGN KEY (\`file_id\`) REFERENCES \`dua_platform\`.\`g_media_object\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }
}
