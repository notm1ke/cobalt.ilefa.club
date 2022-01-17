import { ApiResponseType, createRemoteHook, UnshapedApiResponse } from '../util';

type BuildingType = 'academic' | 'residential' | 'dining' | 'athletics' | 'poi' | 'other';

export enum DayType {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
}

export type MarkerHours = {
    day: string;
    open: string;
    close: string;
}

export type LatLng = {
    lat: number;
    lng: number;
}

export type MarkerPayload = {
    name: string;
    position: LatLng;
    type: BuildingType;
    description: string;
    address: string;
    classroomPrefixes?: string[];
    diningHallType?: string;
    residenceHallType?: string;
    hours?: MarkerHours[];
}

export type CartographerResponse = UnshapedApiResponse & {
    markers: MarkerPayload[];
}

export type CartographerResponsePayload = [
    MarkerPayload[] | null,
    boolean,
    boolean
]

export const useCartographer = (): CartographerResponsePayload =>
    createRemoteHook<CartographerResponse, CartographerResponsePayload>('Cartographer', '/api/maps',
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS: {
                    return [data!.markers, false, false];
                }
            }
        });