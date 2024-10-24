/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AddStoryRequestDto = {
    /**
     * название истории
     */
    storyName: string;
    /**
     * порядковый номер заявки
     */
    id: number;
    /**
     * статус заявки
     */
    status: AddStoryRequestDto.status;
    /**
     * комментарий от проверяющего
     */
    comment: string;
};
export namespace AddStoryRequestDto {
    /**
     * статус заявки
     */
    export enum status {
        SEND = 'SEND',
        SUCCESSED = 'SUCCESSED',
        CANCELLED = 'CANCELLED',
    }
}

