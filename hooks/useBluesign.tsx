import { RoomSchedule } from '@ilefa/bluesign';

import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    replaceAll,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface BluesignQueryProps {
    room: string;
}

export type BluesignResponsePayload = RoomSchedule & TimedRequest & UnshapedApiResponse;

export const useBluesign = ({ room }: BluesignQueryProps): DefaultShapedHook<BluesignResponsePayload> =>
    createRemoteHook<BluesignResponsePayload, DefaultShapedHook<BluesignResponsePayload>>('Bluesign', `/api/bluesign?room=${replaceAll(room, /\s/, '_').toLowerCase()}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, url, false, false];
            }
        });