/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddEthnicGroupMapDto } from '../models/AddEthnicGroupMapDto';
import type { ConstituentFilledDto } from '../models/ConstituentFilledDto';
import type { EthnicGroupMapDto } from '../models/EthnicGroupMapDto';
import type { EthnicGroupMapPointEntity } from '../models/EthnicGroupMapPointEntity';
import type { EthnicGroupMapPointEntityWithConstituents } from '../models/EthnicGroupMapPointEntityWithConstituents';
import type { EthnicGroupMapWithGroupDto } from '../models/EthnicGroupMapWithGroupDto';
import type { StreamableFile } from '../models/StreamableFile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MapControllerService {
    /**
     * получить данные для отрисовки карты
     * @returns StreamableFile Success
     * @throws ApiError
     */
    public static mapControllerGetMapTopojson(): CancelablePromise<StreamableFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/map/map.json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение точек этнических групп на карте
     * @returns EthnicGroupMapWithGroupDto Success
     * @throws ApiError
     */
    public static mapControllerGetEthnicalGroupPoints(): CancelablePromise<Array<EthnicGroupMapWithGroupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/map/ethnic-groups',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение точек этнических групп по номеру региона
     * @param constituentId
     * @returns EthnicGroupMapPointEntity Success
     * @throws ApiError
     */
    public static mapControllerGetEthnicalGroupPointsByConstituentId(
        constituentId: number,
    ): CancelablePromise<Array<EthnicGroupMapPointEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/map/ethnic-groups/{constituentId}',
            path: {
                'constituentId': constituentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение точек этнических групп по названию этнической группы
     * @param name
     * @returns EthnicGroupMapPointEntityWithConstituents Success
     * @throws ApiError
     */
    public static mapControllerGetEthnicGroupPointsByName(
        name: string,
    ): CancelablePromise<Array<EthnicGroupMapPointEntityWithConstituents>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/map/ethnic-groups/{name}',
            path: {
                'name': name,
            },
        });
    }
    /**
     * добавление точки этнической группы на карту
     * необходима роль администратора
     * @param ethnicGroupId
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns EthnicGroupMapDto Success
     * @throws ApiError
     */
    public static mapControllerAddEthnicalGroupPoint(
        ethnicGroupId: number,
        requestBody: AddEthnicGroupMapDto,
        authorization?: string,
    ): CancelablePromise<EthnicGroupMapDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/map/ethnic-groups/{ethnicGroupId}',
            path: {
                'ethnicGroupId': ethnicGroupId,
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
     * удаление точки этнической группы
     * необходима роль администратора
     * @param pointId
     * @param authorization Пример: Bearer accessToken
     * @returns EthnicGroupMapDto Success
     * @throws ApiError
     */
    public static mapControllerDeleteEthnicalGroupPoint(
        pointId: number,
        authorization?: string,
    ): CancelablePromise<EthnicGroupMapDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/map/ethnic-groups/{pointId}',
            path: {
                'pointId': pointId,
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
     * получение списка субъектов и их заполненности озвучками
     * @returns ConstituentFilledDto Success
     * @throws ApiError
     */
    public static mapControllerGetPercentsFilledStoriesByConstituentId(): CancelablePromise<Array<ConstituentFilledDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/map/constituents/filled',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
