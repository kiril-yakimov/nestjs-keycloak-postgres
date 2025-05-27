import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppCacheModule } from './modules/cache/cache.module';
import { DatabaseModule } from './modules/database/database.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { LoggerModule } from './modules/logger/logger.module';
import { GlobalValidationPipe } from './pipes';
import config from '@api/config';

const sharedProviders: Provider[] = [GlobalValidationPipe];

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: config,
        }),
        DatabaseModule,
        LoggerModule,
        KeycloakModule,
        AppCacheModule,
    ],
    providers: [...sharedProviders],
    exports: [...sharedProviders],
})
export class SharedModule {}
