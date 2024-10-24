/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAudioStoryDto } from '../models/AddAudioStoryDto';
import type { AddRatingAudioStoryDto } from '../models/AddRatingAudioStoryDto';
import type { AddStoryDto } from '../models/AddStoryDto';
import type { AddTextStoryDto } from '../models/AddTextStoryDto';
import type { AudioStoryLanguageDto } from '../models/AudioStoryLanguageDto';
import type { CreatedImageStoryDto } from '../models/CreatedImageStoryDto';
import type { EditStoryDto } from '../models/EditStoryDto';
import type { ImageStoryDto } from '../models/ImageStoryDto';
import type { RatingAudioStoryDto } from '../models/RatingAudioStoryDto';
import type { StoryDto } from '../models/StoryDto';
import type { StreamableFile } from '../models/StreamableFile';
import type { TextStoryDto } from '../models/TextStoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StoryControllerService {
    /**
     * получение всех сказок
     * @returns StoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetAllStories(): CancelablePromise<Array<StoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/all',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение сказок в которых есть подстрока name
     * @param name
     * @returns StoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetStoryByName(
        name: string,
    ): CancelablePromise<Array<StoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/by-name/{name}',
            path: {
                'name': name,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение общей информации о выбранной сказке
     * @param storyId
     * @returns StoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetStoryById(
        storyId: number,
    ): CancelablePromise<StoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/{storyId}',
            path: {
                'storyId': storyId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение доступных языков озвучки для выбранной сказки
     * @param storyId
     * @returns AudioStoryLanguageDto Success
     * @throws ApiError
     */
    public static storyControllerGetLanguagesForCurrentStory(
        storyId: number,
    ): CancelablePromise<Array<AudioStoryLanguageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/languages/{storyId}',
            path: {
                'storyId': storyId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение всех сказок выбранной этнической группы
     * @param ethnicGroupId
     * @returns StoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetStoriesByEthnicGroupId(
        ethnicGroupId: number,
    ): CancelablePromise<Array<StoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/ethnic-group/{ethnicGroupId}',
            path: {
                'ethnicGroupId': ethnicGroupId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * добавление сказки
     * необходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns StoryDto Success
     * @throws ApiError
     */
    public static storyControllerAddStory(
        requestBody: AddStoryDto,
        authorization?: string,
    ): CancelablePromise<StoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/story/add',
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
     * редактирование сказки
     * необходима роль администратора
     * @param storyId
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns StoryDto Success
     * @throws ApiError
     */
    public static storyControllerEditSotry(
        storyId: number,
        requestBody: EditStoryDto,
        authorization?: string,
    ): CancelablePromise<StoryDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/story/edit/{storyId}',
            path: {
                'storyId': storyId,
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
     * удаление сказки
     * необходима роль администратора
     * @param storyId
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static storyControllerDeleteStoryById(
        storyId: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/story/delete/{storyId}',
            path: {
                'storyId': storyId,
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
     * добавление текста сказки
     * небходима роль администратора
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns TextStoryDto Success
     * @throws ApiError
     */
    public static storyControllerAddTextStory(
        requestBody: AddTextStoryDto,
        authorization?: string,
    ): CancelablePromise<TextStoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/api/story/text/add/{storyId}',
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
     * получение текста сказки
     * @param storyId
     * @returns TextStoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetTextStoryByStoryId(
        storyId: number,
    ): CancelablePromise<TextStoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/text/{storyId}',
            path: {
                'storyId': storyId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * получение одобренной озвучки по audioId
     * возвращает StreamableFile
     * @param audioId
     * @returns StreamableFile Success
     * @throws ApiError
     */
    public static storyControllerGetAudioStoryById(
        audioId: number,
    ): CancelablePromise<StreamableFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/audio/{audioId}',
            path: {
                'audioId': audioId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * добавление озвучки к сказке
     * пример запроса: /api/story/audio?storyId=8 | необходима роль администратора
     * @param storyId
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static storyControllerSetUserAudioToStory(
        storyId: number,
        requestBody: AddAudioStoryDto,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/story/audio',
            headers: {
                'authorization': authorization,
            },
            query: {
                'storyId': storyId,
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
     * получение обложки для сказки по storyId
     * @param storyId
     * @returns ImageStoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetImgStoryById(
        storyId: number,
    ): CancelablePromise<ImageStoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/image/{storyId}',
            path: {
                'storyId': storyId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Image not found`,
            },
        });
    }
    /**
     * загрузка обложки для выбранной сказки
     * необходима роль администратора
     * @param storyId
     * @param authorization Пример: Bearer accessToken
     * @returns CreatedImageStoryDto Success
     * @throws ApiError
     */
    public static storyControllerUploadStoryImage(
        storyId: number,
        authorization?: string,
    ): CancelablePromise<CreatedImageStoryDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/story/image/upload/{storyId}',
            path: {
                'storyId': storyId,
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
     * удаление обложки для выбранной сказки по storyId
     * необходима роль администратора
     * @param storyId
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static storyControllerDeleteStoryImgByStoryId(
        storyId: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/api/story/image/delete/{storyId}',
            path: {
                'storyId': storyId,
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
     * получение оценки для выбранной озвучки
     * @param audioId
     * @returns RatingAudioStoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetRatingByAudioId(
        audioId: number,
    ): CancelablePromise<RatingAudioStoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/rating/{audioId}',
            path: {
                'audioId': audioId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * получение оценки для выбранной озвучки для текущего пользователя
     * @param userAudioId
     * @returns RatingAudioStoryDto Success
     * @throws ApiError
     */
    public static storyControllerGetRatingByAudioIdForCurrentUser(
        userAudioId: number,
    ): CancelablePromise<RatingAudioStoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/api/story/rating/my/{userAudioId}',
            path: {
                'userAudioId': userAudioId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * добавление текущим пользователем оценки к озвучке по audioId
     * @param requestBody
     * @param authorization Пример: Bearer accessToken
     * @returns any Success
     * @throws ApiError
     */
    public static storyControllerAddRatingForStoryByCurrentUser(
        requestBody: AddRatingAudioStoryDto,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/api/story/rating/add',
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
}
