import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class DatabaseHealthCheckService extends HealthIndicator {
    public constructor(private readonly em: EntityManager) {
        super();
    }

    public async isHealthy(): Promise<HealthIndicatorResult> {
        const isConnected = await this.em.getConnection().isConnected();

        if (!isConnected) {
            throw new HealthCheckError('Database is down.', isConnected);
        }

        return this.getStatus('database', isConnected);
    }
}
