import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseHealthCheckService } from './database.healthcheck.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('DatabaseHealthCheckService', () => {
    let service: DatabaseHealthCheckService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CqrsModule],
            providers: [DatabaseHealthCheckService],
        }).compile();

        service = module.get<DatabaseHealthCheckService>(DatabaseHealthCheckService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
