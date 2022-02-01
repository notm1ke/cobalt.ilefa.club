import { MarkerPayload } from '../../../hooks';

export interface PointOfInterestMarkerProps {
    marker: MarkerPayload;
}

export const PointOfInterestMarker: React.FC<PointOfInterestMarkerProps> = ({ marker }) => (
    <>
        {marker.address && (
            <><i className="fas fa-location-arrow fa-fw"></i> <i>{marker.address}</i> <br /><br /></>
        )}
        {marker.description ?? `There is no description for ${marker.name}.`}
        <br />{!marker.description ? <></> : <br/>}
        <span className="text-primary"><i className="fa fa-link fa-fw"></i> Click for more information.</span>
    </>
)