/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ValidationExceptionResponseDto = {
    /**
     * статус код
     */
    statusCode: number;
    /**
     * описание ошибки
     */
    message: string;
    /**
     * объекто с полями и массивом ошибок их
     */
    validationErrors: Record<string, any>;
};

