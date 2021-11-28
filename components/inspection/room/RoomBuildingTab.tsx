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