/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StoryDto } from './StoryDto';
import type { UserAudioDto } from './UserAudioDto';
export type ApprovedUserAudioDto = {
    /**
     * storyAudioId(ид опубликованной озвучки)
     */
    id: number;
    /**
     * данные озвучки пользователя
     */
    userAudio: UserAudioDto;
    /**
     * id пользователя(автора)
     */
    author: number;
    /**
     * storyAudioId(ид опубликованной озвучки)
     */
    story: StoryDto;
};

