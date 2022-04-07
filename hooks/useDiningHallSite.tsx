import moment from 'moment';

import { DiningHallResponse } from '@ilefa/blueplate';

import {
    ApiResponseType,
    createRemoteHook,
    UnshapedApiResponse,
} from '../util';

export interface DiningHallSiteLookupProps {
    date?: Date;
    now?: boolean;
}

type BlueplateSiteResponse = UnshapedApiResponse & {
    halls: DiningHallResponse[];
};

type BlueplateSiteShapedResponse = [
    DiningHallResponse[] | null,
    boolean,
    boolean
];

export const useDiningHallSite = ({ date, now }: DiningHallSiteLookupProps): BlueplateSiteShapedResponse =>
    createRemoteHook<BlueplateSiteResponse, BlueplateSiteShapedResponse>('DiningHalls', `/api/blueplate?mode=site${!now ? `&date=${moment(date).format('MM-DD-YYYY')}` : ''}`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!.halls, false, false];
            }
        });