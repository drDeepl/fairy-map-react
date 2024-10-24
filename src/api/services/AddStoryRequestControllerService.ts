/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddStoryRequestDto } from '../models/AddStoryRequestDto';
import type { AddStoryRequestEntity } from '../models/AddStoryRequestEntity';
import type { CreateAddStoryRequestDto } from '../models/CreateAddStoryRequestDto';
import type { EditAddStoryRequestDto } from '../models/EditAddStoryRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddStoryRequestControllerService {
    /**
     * получение всех заявок на добавление сказки
     * необходима роль администратора. пример запроса: /api/add-story-request/all?start=1&count=10
     * @param start номер первого элемента
     * @param count количество элементов
     * @param authorization Пример: Bearer accessToken
     * @returns AddStoryRequestEntity Success
     * @throws ApiError
     */
    public static addStoryRequestControllerGetAddStoryRequestAll(
        start: number,
        count: number,
        authorization?: string,
    ): CancelablePromise<Array<AddStoryRequestEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/add-story-request/all',
            headers: {
                'authorization': authorization,
            },
            query: {
                'start': start,
                'count': count,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение всех заявок на добавление сказки от текущего пользователя
     * @param authorization Пример: Bearer accessToken
     * @returns AddStoryRequestDto Success
     * @throws ApiError
     */
    public static addStoryRequestControllerGetAddStoryRequestForCurrentUser(
        authorization?: string,
    ): CancelablePromise<Array<AddStoryRequestDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/add-story-request/my-requests',
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
     * получение всех заявок на добавление сказки для выбранного пользователя
     * необходима роль администратора.
     * @param userId
     * @param authorization Пример: Bearer accessToken
     * @returns AddStoryRequestDto Success
     * @throws ApiError
     */
    public static addStoryRequestControllerGetAddStoryRequestByUserId(
        userId: number,
        authorization?: string,
    ): CancelablePromise<Array<AddStoryRequestDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/add-story-request/by-user/{userId}',
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
     * создание заявки на добавление сказки
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns AddStoryRequestDto Success
     * @throws ApiError
     */
    public static addStoryRequestControllerCreateAddStoryRequestForCurrentUser(
        requestBody: CreateAddStoryRequestDto,
        authorization?: string,
    ): CancelablePromise<AddStoryRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/add-story-request/create',
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
     * обновление заявки
     * необходима роль администратора. статус заявки берется из /api/request/status/all | Необходима роль moder | После успешного редактирования данные заявки так же передаются пользователю с userId по веб-сокету
     * @param addStoryRequestId
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns AddStoryRequestEntity Success
     * @throws ApiError
     */
    public static addStoryRequestControllerEditStatusAddStoryReqeust(
        addStoryRequestId: number,
        requestBody: EditAddStoryRequestDto,
        authorization?: string,
    ): CancelablePromise<AddStoryRequestEntity> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/add-story-request/edit/{addStoryRequestId}',
            path: {
                'addStoryRequestId': addStoryRequestId,
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
     * удаление заявки
     * Необходима роль администратора
     * @param addStoryRequestId
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static addStoryRequestControllerDeleteAddStoryRequestById(
        addStoryRequestId: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/add-story-request/delete/{addStoryRequestId}',
            path: {
                'addStoryRequestId': addStoryRequestId,
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
