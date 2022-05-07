/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import MdiIcon from '@mdi/react';
import TrackedRooms from '@ilefa/bluesign/tracked.json';

import styles from '../../styling/building.module.css';
import cardStyles from '../../styling/card.module.css';

import { Modal } from '../../';
import { mdiChairSchool } from '@mdi/js';
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
        <span className="text-primary-light">
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

    let bluesignRooms = TrackedRooms.filter(room => room.startsWith(buildingType.toUpperCase()));

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
                    <hr />
                    {
                        trackingEnabled && (
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <pre className={`${styles.sectionTitle} text-primary font-weight-bold`}><i className="fa fa-calendar-alt fa-fw"></i> Managed Classrooms</pre>
                                        <ul className={styles.roomList}>
                                            <div className="row">
                                                {
                                                    buildings!
                                                        .find(building => building.code === buildingType)
                                                        ?.rooms
                                                        .map(room => (
                                                            <div className="col-md-4">
                                                                <li>
                                                                    <a className="text-default" href={`/room/${room.name}`}>
                                                                        {getIconForRoom(room)} {room.name.split(room.room)[0]} {room.room}
                                                                    </a>
                                                                </li>
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <pre className={`${styles.sectionTitle} text-primary font-weight-bold`}><i className="far fa-clone fa-fw"></i> All Classrooms</pre>
                                        <ul className={styles.roomList}>
                                            <div className="row">
                                                {
                                                    bluesignRooms
                                                        .map(room => (
                                                            <div className="col-md-4">
                                                                <li>
                                                                    <span className="text-default">
                                                                        <MdiIcon path={mdiChairSchool} className="fa-fw" size="16px" /> {room.split('_').join(' ')}
                                                                    </span>
                                                                </li>
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </span>
        </Modal>
    )
}