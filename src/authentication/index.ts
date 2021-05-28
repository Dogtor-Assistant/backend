import type { NextFunction } from 'express';
import type { Request, Response } from 'utils/types';

import { urlencoded } from 'body-parser';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
    REFRESH_TOKEN_SECRET,
    TOKEN_SECRET,
} from 'utils/constants';

type Grant = {
    'grant_type' : 'password',
    username: string,
    password: string,
} | {
    'grant_type' : 'refresh_token',
    'refresh_token' : string
}

type TokenSuccess = {
    'access_token': string,
    'token_type': 'bearer',
    'expires_in': number,
    'refresh_token': string,
}

type TokenError = {
    'error': 'invalid_request' | 'invalid_grant' | 'unsupported_grant_type',
    'error_description': string,
}

type TokenResponse = TokenSuccess | TokenError;

type TokenInfo = {
    id: string,
    accessToken?: string,
}

async function authenticated(token: string, secret: string): Promise<TokenInfo> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, value) => {
            if (error != null) {
                reject(error);
            }

            if (value != null && typeof value === 'object' && Object.keys(value).includes('id')) {
                resolve(value as TokenInfo);
                return;
            }
            
            reject();
        });
    });
}

function createAuthenticatedToken(id: string): TokenSuccess {
    const accessToken = jwt.sign(
        { id },
        TOKEN_SECRET,
        {
            expiresIn: 3600,
        },
    );

    const refreshToken = jwt.sign(
        { accessToken, id },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: 2592000,
        },
    );

    return {
        'access_token' : accessToken,
        'expires_in': 3600,
        'refresh_token': refreshToken,
        'token_type' : 'bearer',
    };
}

export const router = (() => {
    const router = Router();

    router.post(
        '/token',
        urlencoded({ extended: true }),
        async (request: Request<Grant>, response: Response<TokenResponse>) => {
            const body = request.body;

            switch (body.grant_type) {
    
            case 'password': {
                const { username, password } = body;

                // TODO: implement a database check
                if (username === 'nerdsupremacist' && password === 'password') {
                    response.send(
                        createAuthenticatedToken('12345'),
                    );

                    return;
                }

                response.status(401).send(
                    {
                        'error' : 'invalid_grant',
                        'error_description' : 'invalid username or password',
                    },
                );

                return;
            }
    
            case 'refresh_token': {
                try {
                    const { id } = await authenticated(body.refresh_token, REFRESH_TOKEN_SECRET);

                    // TODO: blacklist previus accessToken and refresh token
                    response.send(
                        createAuthenticatedToken(id),
                    );
                } catch {
                    response.status(401).send(
                        {
                            'error' : 'invalid_grant',
                            'error_description' : 'invalid refresh token',
                        },
                    );
                }
        
                return;
            }

            default:
                response.status(400).send(
                    {
                        'error' : 'invalid_request',
                        'error_description' : 'Request was not a valid token request',
                    },
                );
            }
        },
    );
    return router;
})();
