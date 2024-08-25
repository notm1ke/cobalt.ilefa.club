/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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