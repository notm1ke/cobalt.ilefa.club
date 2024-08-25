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

import styles from '../../styling/inspection.module.css';

import { RoomInspectionPayload } from '../../../hooks';
import { BuildingDescriptions, getIconForBuilding } from '../../../util';

export interface RoomBuildingTabProps {
    room: RoomInspectionPayload;
}

export const RoomBuildingTab: React.FC<RoomBuildingTabProps> = ({ room }) => {
    return (
        <div className={styles.tabBody}>
            <pre className={`${styles.sectionTitle} text-primary mt-3`}>{getIconForBuilding(room.building.code as any, `fa-fw ${styles.roomBuildingIcon}`)} {room.building.name} Building</pre>
            <p className={`${styles.description}`}>
                <i>{BuildingDescriptions[room.building.code]}</i>
                <br />
                
            </p>
        </div>
    )
}