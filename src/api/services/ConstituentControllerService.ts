/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddConstituentDto } from '../models/AddConstituentDto';
import type { AddEthnicGroupToConstituentDto } from '../models/AddEthnicGroupToConstituentDto';
import type { ConstituentDto } from '../models/ConstituentDto';
import type { DeleteEthnicGroupToConstituentDto } from '../models/DeleteEthnicGroupToConstituentDto';
import type { EditConstituentDto } from '../models/EditConstituentDto';
import type { EthnicGroupToConstituentDto } from '../models/EthnicGroupToConstituentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConstituentControllerService {
    /**
     * добавление субъекта РФ
     * необходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns ConstituentDto Success
     * @throws ApiError
     */
    public static constituentsControllerAddConstituent(
        requestBody: AddConstituentDto,
        authorization?: string,
    ): CancelablePromise<ConstituentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/constituent/add',
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
     * добавление этнической группы к субъекту рф
     * небходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns EthnicGroupToConstituentDto Success
     * @throws ApiError
     */
    public static constituentsControllerAddEthnicGroupToConstituent(
        requestBody: AddEthnicGroupToConstituentDto,
        authorization?: string,
    ): CancelablePromise<EthnicGroupToConstituentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/constituent/add/ethnic-group',
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
     * удаление этнической группы у субъекта рф
     * необходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns EthnicGroupToConstituentDto Success
     * @throws ApiError
     */
    public static constituentsControllerDeleteEthnicGroupFromConstituent(
        requestBody: DeleteEthnicGroupToConstituentDto,
        authorization?: string,
    ): CancelablePromise<EthnicGroupToConstituentDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/constituent/ethnic-group/delete',
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
     * получение этнической группы, принадлежащей субъекту рф
     * @param constituentId
     * @returns EthnicGroupToConstituentDto Success
     * @throws ApiError
     */
    public static constituentsControllerGetEthnicGroupByConstituentId(
        constituentId: number,
    ): CancelablePromise<Array<EthnicGroupToConstituentDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/constituent/ethnic-group/{constituentId}',
            path: {
                'constituentId': constituentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение всех субъектов
     * @returns ConstituentDto Success
     * @throws ApiError
     */
    public static constituentsControllerGetConstituents(): CancelablePromise<Array<ConstituentDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/constituent/all',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * редактирование субъекта
     * небходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static constituentsControllerEditConstituent(
        requestBody: EditConstituentDto,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/constituent/edit/{id}',
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
     * удаление данных субъекта
     * необходима роль администратора
     * @param id
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static constituentsControllerDeleteConstituentById(
        id: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/constituent/{id}',
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
}
