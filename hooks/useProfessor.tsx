import { RateMyProfessorReport } from '@ilefa/husky';

import {
    ApiResponseType,
    createRemoteHook,
    DefaultShapedHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface ProfessorLookupProps {
    rmpIds: string[];
}

export type RmpResponse = RateMyProfessorReport & TimedRequest & UnshapedApiResponse & {
    mostRelevant: string;
}

export const useProfessor = ({ rmpIds }: ProfessorLookupProps): DefaultShapedHook<RmpResponse> =>
    createRemoteHook<RmpResponse, DefaultShapedHook<RmpResponse>>('Professor', `/api/professor/${rmpIds.join(',')}`,
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