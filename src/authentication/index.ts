import type { NextFunction } from 'express';
import type { Request, Response } from 'utils/types';

import { urlencoded } from 'body-parser';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Keyv from 'keyv';
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

const accessTokenExpirationInMinutes = 3600;
const refreshTokenExpirationInMinutes = 2592000;
const consumedAccessTokens = new Keyv<true>({ ttl: accessTokenExpirationInMinutes * 60 * 1000 });
const consumedRefreshTokens = new Keyv<true>({ ttl: refreshTokenExpirationInMinutes * 60 * 1000 });

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
            expiresIn: accessTokenExpirationInMinutes,
        },
    );

    const refreshToken = jwt.sign(
        { accessToken, id },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: refreshTokenExpirationInMinutes,
        },
    );

    return {
        'access_token' : accessToken,
        'expires_in': accessTokenExpirationInMinutes,
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
                    const isConsumed = await consumedRefreshTokens.get(body.refresh_token) ?? false;
                    if (isConsumed) {
                        response.status(401).send(
                            {
                                'error' : 'invalid_grant',
                                'error_description' : 'refresh token consumed twice',
                            },
                        );
                        return;
                    }

                    const { id, accessToken } = await authenticated(body.refresh_token, REFRESH_TOKEN_SECRET);

                    consumedRefreshTokens.set(body.refresh_token, true);
                    if (accessToken != null) {
                        consumedAccessTokens.set(accessToken, true);
                    }

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

export async function authenticationRequired(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    if (request.headers.authorization != null) {
        const token = request.headers.authorization.split(' ')[1];
        const isConsumed = await consumedAccessTokens.get(token) ?? false;

        if (!isConsumed) {
            try {
                const { id } = await authenticated(token, TOKEN_SECRET);
                request.authenticated = { id };
                next();
                return;
            } catch {
                // do nothing (fall through to sending 401)
            }
        }

        response.status(401).send({
            error: 'Unauthorized',
            message: 'Invalid token',
        });
        return;
    }

    response.status(401).send({
        error: 'Unauthorized',
        message: 'No token provided in the request',
    });
}

export async function authenticationOptional(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    if (request.headers.authorization != null) {
        const token = request.headers.authorization.split(' ')[1];
        const isConsumed = await consumedAccessTokens.get(token) ?? false;

        if (!isConsumed) {
            try {
                const { id } = await authenticated(token, TOKEN_SECRET);
                request.authenticated = { id };
                next();
                return;
            } catch {
                // do nothing (fall through to setting the authenticated user to null)
            }
        }

        response.status(401).send({
            error: 'Unauthorized',
            message: 'Invalid token',
        });
        return;
    }

    request.authenticated = null;
    next();
}
