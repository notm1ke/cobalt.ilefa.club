import {
    DiningHall,
    DiningHallStatus,
} from '@ilefa/blueplate';

import {
    ApiResponseType,
    createRemoteHook,
    UnshapedApiResponse,
} from '../util';

type BlueplateProps = {
    poll?: number;
}

type CustomDiningHall = DiningHall & {
    status: DiningHallStatus;
}

type BlueplateResponse = UnshapedApiResponse & {
    halls: CustomDiningHall[];
};

type BlueplateShapedResponse = [
    CustomDiningHall[] | null,
    boolean,
    boolean
];

export const useDiningHalls = ({ poll }: BlueplateProps): BlueplateShapedResponse =>
    createRemoteHook<BlueplateResponse, BlueplateShapedResponse>('DiningHalls', `/api/blueplate`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!.halls, false, false];
            }
        }, poll);