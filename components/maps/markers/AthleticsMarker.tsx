/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { MarkerPayload } from '../../../hooks';

export interface AthleticsMarkerProps {
    marker: MarkerPayload;
}

export const AthleticsMarker: React.FC<AthleticsMarkerProps> = ({ marker }) => (
    <>
        {marker.address && (
            <><i className="fas fa-location-arrow fa-fw"></i> <i>{marker.address}</i> <br /><br /></>
        )}
        {marker.description ?? `There is no description for ${marker.name}.`}
        <br />{!marker.description ? <></> : <br/>}
        <span className="text-gray"><i className="fas fa-chevron-right fa-fw ml--1"></i> <i>Marker implementation coming soon.</i></span>
    </>
)