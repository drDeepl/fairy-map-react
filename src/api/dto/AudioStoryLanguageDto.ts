/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthorUserDto } from './AuthorUserDto';
import type { LanguageDto } from './LanguageDto';
export type AudioStoryLanguageDto = {
    /**
     * audioStoryId
     */
    id: number;
    /**
     * ид озвучки пользователя
     */
    userAudioId: number;
    /**
     * средняя оценка озвучки
     */
    moderateScore: number;
    /**
     * информация о языке
     */
    language: LanguageDto;
    /**
     * информация об авторе
     */
    authors: AuthorUserDto;
};

