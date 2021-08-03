import { ProfessorData } from '@ilefa/husky';

import {
    ApiResponseType,
    createRemoteHook,
    DefaultShapedHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface ProfessorsLookupProps {
    course: string;
    campus?: string;
}

export type ProfessorsPayload = UnshapedApiResponse & TimedRequest & {
    professors: ProfessorData[] | null;
};

export const useProfessors = ({ course, campus }: ProfessorsLookupProps): DefaultShapedHook<ProfessorsPayload> => 
    createRemoteHook<ProfessorsPayload, DefaultShapedHook<ProfessorsPayload>>('Professors', `/api/professors/${course + (campus ? `?campus=${campus}` : '')}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [{ professors: null, timings: -1 }, url, false, true];
                case ApiResponseType.LOADING:
                    return [{ professors: null, timings: -1 }, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [{ professors: data!.professors, timings: data!.timings }, url, false, false];
            }
        })