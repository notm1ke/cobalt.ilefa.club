import {
    ApiResponseType,
    createRemoteHook,
    CustomUConnServiceReport,
    CustomUConnServiceString,
    UnshapedApiResponse
} from '../util';

export type StatusResponsePayload = UnshapedApiResponse & {
    status: CustomUConnServiceReport[];
}

export type ShapedStatusPayload = [
    CustomUConnServiceReport[] | null,
    boolean,
    boolean
]

export const useStatus = (all = false, ...include: CustomUConnServiceString[]): ShapedStatusPayload =>
    createRemoteHook<StatusResponsePayload, ShapedStatusPayload>('Status', `/api/status?include=${all ? 'all' : include.join(',')}`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!.status, false, false];
            } 
        }, 10000);