import {
    ApiResponseType,
    CompleteRoomPayload,
    createRemoteHook,
    DefaultShapedHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface RoomLookupProps {
    name: string;
}

export type RoomInspectionPayload = CompleteRoomPayload & TimedRequest & UnshapedApiResponse;

export const useRoom = ({ name }: RoomLookupProps): DefaultShapedHook<RoomInspectionPayload> => { 
    let url = `/api/room/${name}`;
    if (!name) url = '/api/noop';

    return createRemoteHook<RoomInspectionPayload, DefaultShapedHook<RoomInspectionPayload>>('Room', url,
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
}