import { APP_CONFIG_KEY, AppConfig, DATABASE_CONFIG_KEY } from '@api/config';
import { ENVIRONMENTS } from '@api/constants';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mikroConfig from './mikro-orm.config';
import { DatabaseConfigInterface } from './types';

@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            providers: [],
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): any => {
                const dbConfig: DatabaseConfigInterface =
                    config.get<DatabaseConfigInterface>(DATABASE_CONFIG_KEY);
                const { environment } = config.get<AppConfig>(APP_CONFIG_KEY);

                return {
                    ...mikroConfig, // Spread the base config
                    host: dbConfig.host || mikroConfig.host,
                    dbName: dbConfig.dbName || mikroConfig.dbName,
                    user: dbConfig.user || mikroConfig.user,
                    password: dbConfig.password || mikroConfig.password,
                    port: dbConfig.port || mikroConfig.port,
                    charset: dbConfig.charset || mikroConfig.charset,
                    collate: dbConfig.collate || mikroConfig.collate,
                    debug: environment !== ENVIRONMENTS.PRODUCTION,
                    discovery: mikroConfig.discovery, // Use the existing discovery setup
                    entities: mikroConfig.entities, // Use the existing entity setup
                    forceUtcTimezone: true,
                    // resultCache: {
                    //     adapter: RedisCacheAdapter,
                    //     options: {
                    //         dsn,
                    //     },
                    // },
                };
            },
        }),
    ],
})
export class DatabaseModule {}
