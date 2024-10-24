/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AddStoryRequestEntity = {
    id: number;
    /**
     * название истории
     */
    storyName: string;
    /**
     * статус заявки
     */
    status: string;
    /**
     * комментарий проверяющего
     */
    comment: string;
    /**
     * ид пользователя, создавшего заявку
     */
    userId: number;
};

