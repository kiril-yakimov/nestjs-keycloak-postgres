import { UserModule } from '@api/modules/user/user.module';
import { KeycloakModule } from '@api/shared/modules/keycloak/keycloak.module';
import { Module } from '@nestjs/common';
import { AppleController, GoogleController, LoginController, RegisterController } from './http';

@Module({
    imports: [UserModule, KeycloakModule],
    controllers: [AppleController, GoogleController, LoginController, RegisterController],
    providers: [],
})
export class AuthModule {}
