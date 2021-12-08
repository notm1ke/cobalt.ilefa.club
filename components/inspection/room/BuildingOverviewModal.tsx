import styles from '../../styling/building.module.css';
import cardStyles from '../../styling/card.module.css';

import { Modal } from '../../';
import { BuildingCode } from '@ilefa/husky';
import { useBuildings } from '../../../hooks';

import {
    BuildingAddresses,
    BuildingDescriptions,
    BuildingMaps,
    getIconForBuilding,
    getIconForRoom
} from '../../../util';

export interface BuildingOverviewModalProps {
    buildingType: keyof typeof BuildingCode;
    open: boolean;
    setOpen: (state: boolean) => void;
}

export const getModalTitle = (buildingType: keyof typeof BuildingCode) => (
    <span>
        <span className="text-primary-light cursor-pointer">
            {getIconForBuilding(buildingType, `fa-fw ${cardStyles.cardModalTitleIcon} mr-2`, 24)}
            <b>{BuildingCode[buildingType]} ({buildingType})</b>
        </span>
    </span>
)

export const BuildingOverviewModal: React.FC<BuildingOverviewModalProps> = ({ buildingType, open, setOpen }) => {
    let name = BuildingCode[buildingType];
    let addr = BuildingAddresses[buildingType];
    if (!addr) addr = 'NONE';

    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'on' : 'at';

    const [buildings, loading, error] = useBuildings();
    const trackingEnabled = buildings && !loading && !error;

    return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width="850px"
            title={getModalTitle(buildingType)}
            closeIcon>
                <span>
                    The <b>{name.endsWith('Building') ? name : name + ' Building'}</b> {addr === 'NONE' ? 'does not have an address' : <>is located {atOn} <a href={BuildingMaps[buildingType]} className="text-primary shine" target="_blank" rel="noopener noreferrer">{BuildingAddresses[buildingType]}</a></>}.
                    <br/><br/>
                    {BuildingDescriptions[buildingType] || 'This building does not have a description.'}
                    {
                        trackingEnabled && (
                            <>
                                <br /><br />
                                <pre className={`${styles.sectionTitle} text-primary mt-3 font-weight-bold`}><i className="fa fa-stream fa-fw"></i> Classrooms</pre>
                                <ul className={styles.roomList}>
                                    {
                                        buildings
                                            .find(building => building.code === buildingType)
                                            ?.rooms
                                            .map(room => (
                                                <li>
                                                    <a className="text-default" href={`/room/${room.name}`}>{getIconForRoom(room)} {room.name.split(room.room)[0]} {room.room}</a>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </>
                        )
                    }
                </span>
        </Modal>
    )
}