import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as dotenv from 'dotenv';
import { EntityGenerator } from '@mikro-orm/entity-generator';

dotenv.config();

const mikroOrmConfig: Options = {
    host: process.env.DB_MAIN_HOST,
    port: +process.env.DB_MAIN_PORT,
    user: process.env.DB_MAIN_USERNAME,
    password: process.env.DB_MAIN_PASSWORD,
    dbName: process.env.DB_MAIN_DATABASE,
    entities: ['dist/src/**/*.entity.{js,ts}'],
    entitiesTs: ['src/**/*.entity.ts'],
    connect: process.env.ENVIRONMENT !== 'test',
    metadataProvider: TsMorphMetadataProvider,
    driver: MySqlDriver,
    allowGlobalContext: true,
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: 'dist/src/database/migrations',
        pathTs: 'src/database/migrations',
        glob: '!(*.d).{js,ts}',
        transactional: true,
        disableForeignKeys: true,
        allOrNothing: true, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: false, // allow to disable table and column dropping
        snapshot: false,
        emit: 'ts', // migration generation mode
        generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
    },
    seeder: {
        path: 'dist/src/database/seeders', // path to the folder with seeders
        pathTs: 'src/database/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
        // defaultSeeder: 'DatabaseSeeder', // default seeder class name
        glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
        emit: 'ts', // seeder generation mode
        fileName: (className: string) => className, // seeder file naming convention
    },
    extensions: [EntityGenerator],
    entityGenerator: {
        bidirectionalRelations: true,
        identifiedReferences: true,
    },
};

export default mikroOrmConfig;
