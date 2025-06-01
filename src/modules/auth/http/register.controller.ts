import { Controller } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

@Public()
@ApiExcludeController()
@Controller({
    path: 'auth/register',
    version: '1',
})
export class RegisterController {
    public constructor() {}

    public async registerUser(): Promise<void> {
        // Logic for registering a user
    }
}
