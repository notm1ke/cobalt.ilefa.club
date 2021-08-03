import { BluepagesRecord } from '@ilefa/bluepages';

import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    IMetricsComponent,
    replaceAll,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface BluepagesQueryProps extends IMetricsComponent {
    name: string;
}

export type BluepagesResponsePayload = BluepagesRecord & TimedRequest & UnshapedApiResponse;

export const useBluepages = ({ name, recordMetric }: BluepagesQueryProps): DefaultShapedHook<BluepagesResponsePayload> =>
    createRemoteHook<BluepagesResponsePayload, DefaultShapedHook<BluepagesResponsePayload>>('Bluepages', `/api/bluepages/${replaceAll(name, /\s/, '_').toLowerCase()}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR: {
                    recordMetric({ request: url, success: false, time: -1, data });
                    return [null, url, false, true];
                }
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS: {
                    recordMetric({ request: url, success: true, time: data!.timings, data });
                    return [data!, url, false, false];
                }
            }
        });