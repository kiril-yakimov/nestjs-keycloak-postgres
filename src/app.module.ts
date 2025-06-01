import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [HttpModule, SharedModule, TerminusModule, AuthModule, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
