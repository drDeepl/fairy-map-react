/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SignInRequestDto } from '../models/SignInRequestDto';
import type { SignUpRequestDto } from '../models/SignUpRequestDto';
import type { TokensResponseDto } from '../models/TokensResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthControllerService {
    /**
     * регистрация
     * @param requestBody
     * @returns TokensResponseDto
     * @throws ApiError
     */
    public static authControllerSignUp(
        requestBody: SignUpRequestDto,
    ): CancelablePromise<TokensResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * вход
     * @param requestBody
     * @returns TokensResponseDto Success
     * @throws ApiError
     */
    public static authControllerSignIn(
        requestBody: SignInRequestDto,
    ): CancelablePromise<TokensResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     *  на обновление access token
     * @param authorization Пример: Bearer refreshToken
     * @returns TokensResponseDto Success
     * @throws ApiError
     */
    public static authControllerRefresh(
        authorization?: string,
    ): CancelablePromise<TokensResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh',
            headers: {
                'authorization': authorization,
            },
        });
    }
    /**
     * выход из системы
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static authControllerLogout(
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
}
