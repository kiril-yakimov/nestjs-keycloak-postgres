import { KEYCLOAK_CONFIG_KEY, KeycloakConfig } from '@api/config';
import { HttpModule } from '@nestjs/axios';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
    AuthGuard,
    KeycloakConnectModule,
    PolicyEnforcementMode,
    ResourceGuard,
    RoleGuard,
    TokenValidation,
} from 'nest-keycloak-connect';
import { KeycloakAdminAuthService, KeycloakAdminUserService } from './services';

const sharedProviders: Provider[] = [KeycloakAdminUserService];

const providers: Provider[] = [
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },
    {
        provide: APP_GUARD,
        useClass: ResourceGuard,
    },
    {
        provide: APP_GUARD,
        useClass: RoleGuard,
    },
];

@Global()
@Module({
    imports: [
        HttpModule,
        ConfigModule,
        KeycloakConnectModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): any => {
                const keycloakConfig = config.get<KeycloakConfig>(KEYCLOAK_CONFIG_KEY);

                return {
                    authServerUrl: keycloakConfig.authUrl,
                    realm: keycloakConfig.realm,
                    clientId: keycloakConfig.clientId,
                    secret: keycloakConfig.clientSecret,
                    realmPublicKey: keycloakConfig.publicKey,
                    policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
                    tokenValidation: TokenValidation.ONLINE,
                };
            },
        }),
    ],
    providers: [...providers, ...sharedProviders, KeycloakAdminAuthService],
    exports: [...sharedProviders],
})
export class KeycloakModule {}
