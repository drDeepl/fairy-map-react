/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedUserAudioDto } from '../models/ApprovedUserAudioDto';
import type { BaseUserAudioDto } from '../models/BaseUserAudioDto';
import type { StreamableFile } from '../models/StreamableFile';
import type { UserAudioDto } from '../models/UserAudioDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserAudioControllerService {
    /**
     * получение озвучек текущего пользователя
     * @param authorization Пример: Bearer accessToken
     * @returns UserAudioDto Success
     * @throws ApiError
     */
    public static userAudioControllerGetCurrentUserAudios(
        authorization?: string,
    ): CancelablePromise<Array<UserAudioDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/user-audio/my-audios',
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение одобренных озвучек текущего пользователя
     * @param authorization Пример: Bearer accessToken
     * @returns ApprovedUserAudioDto Success
     * @throws ApiError
     */
    public static userAudioControllerGetApprovedUserAudiosCurrentUser(
        authorization?: string,
    ): CancelablePromise<Array<ApprovedUserAudioDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/user-audio/my-audios/approved',
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение файла озвучки пользователя
     * @param userAudioId
     * @returns StreamableFile Success
     * @throws ApiError
     */
    public static userAudioControllerGetUserAudioById(
        userAudioId: number,
    ): CancelablePromise<StreamableFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/user-audio/{userAudioId}',
            path: {
                'userAudioId': userAudioId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * загрузка озвучки пользователя для выбранного языка
     * в теле запроса(body) файл прикрепляется к полю file
     * @param languageId
     * @param formData
     * @param authorization Пример: Bearer accessToken
     * @returns UserAudioDto Success
     * @throws ApiError
     */
    public static userAudioControllerUploadUserAudio(
        languageId: number,
        formData: {
            file?: Blob;
        },
        authorization?: string,
    ): CancelablePromise<UserAudioDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/user-audio/upload/{languageId}',
            path: {
                'languageId': languageId,
            },
            headers: {
                'authorization': authorization,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * удаление озвучки пользователя
     * необходима роль администратора
     * @param userAudioId
     * @param authorization Пример: Bearer accessToken
     * @returns BaseUserAudioDto Success
     * @throws ApiError
     */
    public static userAudioControllerDeleteUserAudioById(
        userAudioId: number,
        authorization?: string,
    ): CancelablePromise<BaseUserAudioDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/user-audio/delete/{userAudioId}',
            path: {
                'userAudioId': userAudioId,
            },
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
