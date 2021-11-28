import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export type BluesignRoomsResponsePayload = TimedRequest & UnshapedApiResponse & {
    rooms: string[]
};

export const useManagedRooms = (): DefaultShapedHook<BluesignRoomsResponsePayload> =>
    createRemoteHook<BluesignRoomsResponsePayload, DefaultShapedHook<BluesignRoomsResponsePayload>>('Bluesign', `/api/bluesign`,
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