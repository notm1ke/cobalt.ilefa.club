/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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