import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [HttpModule, SharedModule, TerminusModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
