/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddEthnicGroupDto } from '../models/AddEthnicGroupDto';
import type { AddLanguageDto } from '../models/AddLanguageDto';
import type { EditEthnicGroupDto } from '../models/EditEthnicGroupDto';
import type { EthnicGroupDto } from '../models/EthnicGroupDto';
import type { EthnicGroupLanguageDto } from '../models/EthnicGroupLanguageDto';
import type { LanguageDto } from '../models/LanguageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EthnicGroupControllerService {
    /**
     * добавление этнической группы
     * необходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns EthnicGroupDto Success
     * @throws ApiError
     */
    public static ethnicGroupControllerAddEthnicGroup(
        requestBody: AddEthnicGroupDto,
        authorization?: string,
    ): CancelablePromise<EthnicGroupDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/ethnic-group/add',
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
     * получение списка этнических групп
     * @returns EthnicGroupLanguageDto Success
     * @throws ApiError
     */
    public static ethnicGroupControllerEthnicGroups(): CancelablePromise<Array<EthnicGroupLanguageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/ethnic-group/all',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение этнической группы по ethnicGroupId
     * @param ethnicGroupId
     * @returns EthnicGroupDto Success
     * @throws ApiError
     */
    public static ethnicGroupControllerGetEthnicGroupById(
        ethnicGroupId: number,
    ): CancelablePromise<EthnicGroupDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/ethnic-group/{ethnicGroupId}',
            path: {
                'ethnicGroupId': ethnicGroupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * редактирование этнической группы
     * необходима роль администратора
     * @param id
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns EthnicGroupDto Success
     * @throws ApiError
     */
    public static ethnicGroupControllerEditEthnicGroup(
        id: number,
        requestBody: EditEthnicGroupDto,
        authorization?: string,
    ): CancelablePromise<EthnicGroupDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/ethnic-group/edit/{id}',
            path: {
                'id': id,
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
     * удаление этнической группы
     * необходима роль администратора
     * @param id
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static ethnicGroupControllerDeleteEthnicGroup(
        id: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/ethnic-group/{id}',
            path: {
                'id': id,
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
     * добавление языка этнической группы
     * необходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns EthnicGroupDto Success
     * @throws ApiError
     */
    public static ethnicGroupControllerAddLanguage(
        requestBody: AddLanguageDto,
        authorization?: string,
    ): CancelablePromise<EthnicGroupDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/ethnic-group/language/add',
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
     * получение списка всех языков
     * @returns LanguageDto Success
     * @throws ApiError
     */
    public static ethnicGroupControllerGetAllLanguage(): CancelablePromise<Array<LanguageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/ethnic-group/language/all',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * удаление языка по id
     * необходима роль администратора
     * @param id
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static ethnicGroupControllerDeleteLanguageById(
        id: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/ethnic-group/language/{id}',
            path: {
                'id': id,
            },
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
