/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EditAddStoryRequestDto = {
    /**
     * статус заявки берется является ENUM
     */
    status: EditAddStoryRequestDto.status;
    /**
     * комментарий
     */
    comment: string;
};
export namespace EditAddStoryRequestDto {
    /**
     * статус заявки берется является ENUM
     */
    export enum status {
        SEND = 'SEND',
        SUCCESSED = 'SUCCESSED',
        CANCELLED = 'CANCELLED',
    }
}

