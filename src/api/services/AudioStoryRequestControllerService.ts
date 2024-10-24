/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAudioStoryRequestDto } from '../models/AddAudioStoryRequestDto';
import type { AudioStoryRequestEntity } from '../models/AudioStoryRequestEntity';
import type { EditAudioStoryRequestDto } from '../models/EditAudioStoryRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AudioStoryRequestControllerService {
    /**
     * получение всех заявок на озвучки текущего пользователя
     * @param authorization Пример: Bearer accessToken
     * @returns AudioStoryRequestEntity Success
     * @throws ApiError
     */
    public static audioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser(
        authorization?: string,
    ): CancelablePromise<Array<AudioStoryRequestEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/audio-story-request/my-requests',
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение всех заявок на озвучки
     * необходимы роль модератора
     * @param authorization Пример: Bearer accessToken
     * @returns AudioStoryRequestEntity Success
     * @throws ApiError
     */
    public static audioStoryRequestControllerGetAllAudioStoryRequests(
        authorization?: string,
    ): CancelablePromise<Array<AudioStoryRequestEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/audio-story-request/all',
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение всех заявок на озвучки для выбранного пользователя.
     * Необходима роль модератора
     * @param userId
     * @param authorization Пример: Bearer accessToken
     * @returns AudioStoryRequestEntity Success
     * @throws ApiError
     */
    public static audioStoryRequestControllerGetAllAudioStoryReqeustsByUserId(
        userId: number,
        authorization?: string,
    ): CancelablePromise<Array<AudioStoryRequestEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/audio-story-request/by-user/{userId}',
            path: {
                'userId': userId,
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
    /**
     * Создание заявки на проверку озвучки
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns AudioStoryRequestEntity Success
     * @throws ApiError
     */
    public static audioStoryRequestControllerCreateAddAudioRequest(
        requestBody: AddAudioStoryRequestDto,
        authorization?: string,
    ): CancelablePromise<AudioStoryRequestEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/audio-story-request/add',
            headers: {
                'authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * редактирование заявки на проверку озвучки
     * необходима роль модератора. после редактирования, отредактированная запись по вебсокету отправляется пользователю из userId(создавшему заявку) в событие с названием "statuses"
     * @param audioStoryReqeustId
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns AudioStoryRequestEntity Success
     * @throws ApiError
     */
    public static audioStoryRequestControllerEditAudioStoryRequest(
        audioStoryReqeustId: number,
        requestBody: EditAudioStoryRequestDto,
        authorization?: string,
    ): CancelablePromise<AudioStoryRequestEntity> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/audio-story-request/edit/{audioStoryReqeustId}',
            path: {
                'audioStoryReqeustId': audioStoryReqeustId,
            },
            headers: {
                'authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * удаление заявки на проверку озвучки
     * необходима роль администратора
     * @param audioStoryRequestId
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static audioStoryRequestControllerDeleteAudioStoryRequestBydId(
        audioStoryRequestId: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/audio-story-request/delete/{audioStoryRequestId}',
            path: {
                'audioStoryRequestId': audioStoryRequestId,
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
