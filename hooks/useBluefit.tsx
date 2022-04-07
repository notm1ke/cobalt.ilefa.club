import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse,
    RecQueryMode
} from '../util';

export type BluefitResponseShape = TimedRequest & UnshapedApiResponse & {
    occupants?: number;
    daily?: BluefitDailyRecord[];
    weekly?: BluefitWeeklyRecord[];
};

export type BluefitDailyRecord = {
    time: string;
    values: number[];
    average: number;
}

export type BluefitWeeklyRecord = {
    day: string;
    values: TimeOccupancyKeyPair[];
    average: number;
}

type TimeOccupancyKeyPair = {
    time: string;
    occupants: number;
}

export const useBluefit = (pollTime: number | undefined, ...mode: RecQueryMode[]): DefaultShapedHook<BluefitResponseShape> =>
    createRemoteHook<BluefitResponseShape, DefaultShapedHook<BluefitResponseShape>>('Bluefit', `/api/bluefit?mode=${mode.join(',')}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, url, false, false];
            }
        }, pollTime, 'GET', null, 10, 1000);