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