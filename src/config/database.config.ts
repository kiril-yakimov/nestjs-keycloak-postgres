import { MikroORMOptions } from '@mikro-orm/core';

export const DATABASE_CONFIG_KEY = 'database';
export type DatabaseConfig = MikroORMOptions;

export const database = (): {
    [DATABASE_CONFIG_KEY]: Partial<DatabaseConfig>;
} => ({
    [DATABASE_CONFIG_KEY]: {
        dbName: process.env.MIKRO_ORM_DATABASE_NAME,
        user: process.env.MIKRO_ORM_DATABASE_USER,
        password: process.env.MIKRO_ORM_DATABASE_PASSWORD,
        port: Number(process.env.MIKRO_ORM_DATABASE_PORT),
        host: process.env.MIKRO_ORM_DATABASE_HOST,
    },
});
