import { Injectable } from '@nestjs/common';
import { KEYCLOAK_CONFIG_KEY, KeycloakConfigInterface } from '../types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class KeycloakAdminAuthService {
    private token: string;
    private tokenExpiration: number;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
    }

    public async getAdminToken(): Promise<string> {
        // Check if the token is expired or not available
        if (!this.token || this.isTokenExpired()) {
            await this.authenticate(); // Re-authenticate if necessary
        }
        return this.token;
    }

    private isTokenExpired(): boolean {
        if (!this.tokenExpiration) {
            return true; // If no expiration is set, consider the token expired
        }
        const now = Math.floor(Date.now() / 1000);
        return now >= this.tokenExpiration;
    }

    private async authenticate(): Promise<void> {
        const keycloakConfig = this.configService.get<KeycloakConfigInterface>(
            KEYCLOAK_CONFIG_KEY
        );

        const {data} = await firstValueFrom(this.httpService.post(`${keycloakConfig.authUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
            new URLSearchParams({
                client_id: keycloakConfig.clientId,
                client_secret: keycloakConfig.clientSecret,
                grant_type: 'client_credentials',
            }).toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }));

        this.token = data.access_token;
        this.tokenExpiration = this.getTokenExpiration(this.token);

    }

    private getTokenExpiration(token: string): number {
        const decodedToken = jwtDecode(token) as { exp: number };
        return decodedToken?.exp || 0;
    }
}
