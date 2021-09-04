import {
    ApiResponseType,
    createRemoteHook,
    Dorm,
    DormHallType,
    DormRatings,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface DormLookupProps {
    hall: keyof typeof DormHallType | null;
}

export type DormInspectionPayload = Dorm & TimedRequest & UnshapedApiResponse & {
    ratings: DormRatings;
};

type DormShapedResponse = [
    DormInspectionPayload | null,
    boolean,
    boolean
];

export const useDorm = ({ hall }: DormLookupProps): DormShapedResponse => { 
    let url = `/api/dorms?type=${hall}`;
    if (!hall) url = '/api/noop';

    return createRemoteHook<DormInspectionPayload, DormShapedResponse>('Dorm', url,
        (type, data, _err, _url) => {
            // noop response - component not hydrated yet
            if (data && (data as any).ping)
                return [null, true, false];

            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, false, false];
            }
        });
}