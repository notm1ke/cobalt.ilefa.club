import {
    ApiResponseType,
    CompleteRoomPayload,
    createRemoteHook,
    UnshapedApiResponse 
} from '../util';

type BuildingResponse = UnshapedApiResponse & {
    buildings: BuildingPayload[];
}

type BuildingShapedResponse = [
    BuildingPayload[] | null,  // data
    boolean,                   // loading
    boolean                    // error
];

export type BuildingPayload = {
    code: string;
    name: string;
    rooms: CompleteRoomPayload[];
};

export const useBuildings = (): BuildingShapedResponse =>
    createRemoteHook<BuildingResponse, BuildingShapedResponse>('Bluepages', `/api/buildings`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!.buildings, false, false];
            }
        });
