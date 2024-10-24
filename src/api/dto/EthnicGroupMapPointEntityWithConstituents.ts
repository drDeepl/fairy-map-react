/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConstituentDto } from './ConstituentDto';
export type EthnicGroupMapPointEntityWithConstituents = {
    id: number;
    ethnicGroupId: number;
    longitude: number;
    latitude: number;
    /**
     * объект региона
     */
    constituent: ConstituentDto;
};

