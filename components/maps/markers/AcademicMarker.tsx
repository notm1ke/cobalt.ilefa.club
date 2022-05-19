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

export interface AcademicMarkerProps {
    marker: MarkerPayload;
}

export const AcademicMarker: React.FC<AcademicMarkerProps> = ({ marker }) => (
    <>
        { marker.address && (<><i className="fas fa-location-arrow fa-fw"></i> <i>{marker.address}</i> <br /><br /></>) }
        { marker.description ?? `There is no description for ${marker.name}.` }
        <br />{!marker.description ? <></> : <br/>}
        <span className="text-primary"><i className="fa fa-link fa-fw"></i> Click for more information.</span>
    </>
)