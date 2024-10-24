/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddTypeRequestDto } from '../models/AddTypeRequestDto';
import type { EditTypeRequestDto } from '../models/EditTypeRequestDto';
import type { TypeRequestDto } from '../models/TypeRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RequestControllerService {
    /**
     * получение списка всех типов заявок
     * @returns TypeRequestDto Success
     * @throws ApiError
     */
    public static requestControllerGetAllRequestTypes(): CancelablePromise<Array<TypeRequestDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/request/type/all',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение типа заявки по id
     * @param typeRequestId
     * @param authorization Пример: Bearer accessToken
     * @returns TypeRequestDto Success
     * @throws ApiError
     */
    public static requestControllerGetTypeRequestById(
        typeRequestId: number,
        authorization?: string,
    ): CancelablePromise<Array<TypeRequestDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/request/type/{typeRequestId}',
            path: {
                'typeRequestId': typeRequestId,
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
     * добавление типа заявки
     * необходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns TypeRequestDto Success
     * @throws ApiError
     */
    public static requestControllerAddTypeRequest(
        requestBody: AddTypeRequestDto,
        authorization?: string,
    ): CancelablePromise<TypeRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/request/type/add',
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
     * редактирование типа заявки
     * необходима роль администратора
     * @param typeRequestId
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns TypeRequestDto Success
     * @throws ApiError
     */
    public static requestControllerEditTypeRequest(
        typeRequestId: number,
        requestBody: EditTypeRequestDto,
        authorization?: string,
    ): CancelablePromise<TypeRequestDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/request/type/edit/{typeRequestId}',
            path: {
                'typeRequestId': typeRequestId,
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
     * удаление типа заявки
     * необходима роль администратора
     * @param typeRequestId
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static requestControllerDeleteTypeRequestById(
        typeRequestId: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/request/type/delete/{typeRequestId}',
            path: {
                'typeRequestId': typeRequestId,
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
     * получение существующих статусов для заявок
     * @returns string Success
     * @throws ApiError
     */
    public static requestControllerGetRequestStatuses(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/request/status/all',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
}
