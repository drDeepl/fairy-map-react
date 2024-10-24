/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponseDto } from '../models/UserResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * получение информации о текущем пользователе
     * @param authorization Пример: Bearer accessToken
     * @returns UserResponseDto
     * @throws ApiError
     */
    public static userControllerGetCurrentUserInfo(
        authorization?: string,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/user/me',
            headers: {
                'authorization': authorization,
            },
        });
    }
    /**
     * получение информации о пользователе по его id
     * необходима роль администратора
     * @param userId
     * @param authorization Пример: Bearer accessToken
     * @returns UserResponseDto
     * @throws ApiError
     */
    public static userControllerFindUserById(
        userId: number,
        authorization?: string,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/user/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'authorization': authorization,
            },
        });
    }
    /**
     * удаленеи пользователя по его id
     * необходима роль администратора
     * @param userId
     * @returns UserResponseDto
     * @throws ApiError
     */
    public static userControllerDeleteUser(
        userId: number,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/user/delete/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
