import { MarkerPayload } from '../../../hooks';

export interface AcademicMarkerProps {
    marker: MarkerPayload;
}

export const AcademicMarker: React.FC<AcademicMarkerProps> = ({ marker }) => (
    <>
        {marker.address && (
            <><i className="fas fa-location-arrow fa-fw"></i> <i>{marker.address}</i> <br /><br /></>
        )}
        {marker.description ?? `There is no description for ${marker.name}.`}
        <br />{!marker.description ? <></> : <br/>}
        <span className="text-primary"><i className="fa fa-link fa-fw"></i> Click for more information.</span>
    </>
)