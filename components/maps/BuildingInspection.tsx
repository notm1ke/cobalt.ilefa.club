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
import cardStyles from '../styling/card.module.css';

import { BuildingCode } from '@ilefa/husky';
import { BuildingDirectory, Modal } from '../';
import { DayType, MarkerPayload } from '../../hooks';
import { mdiCalendarBlankMultiple, mdiClockFast, mdiSignText } from '@mdi/js';

import {
    BuildingAddresses,
    BuildingDescriptions,
    BuildingMaps,
    getIconForBuilding
} from '../../util';

export interface BuildingInspectionProps {
    marker: MarkerPayload;
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

export const BuildingInspection: React.FC<BuildingInspectionProps> = ({ marker, open, setOpen }) => {
    let markerType = marker.classroomPrefixes!.filter(prefix => {
        let desc = BuildingDescriptions[prefix];
        return desc && desc !== 'There is no description for this building.';
    })[0];

    if (!markerType)
        return <></>;
    
    let buildingType = markerType as keyof typeof BuildingCode;
    let name = BuildingCode[buildingType];
    let addr = BuildingAddresses[buildingType];
    if (!addr) addr = 'NONE';

    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'on' : 'at';
    let dayMappings = Object.values(DayType).map((day, i) => ({ day, i }));

    return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width="1000px"
            title={getModalTitle(buildingType)}
            closeIcon>
                <span>
                    The <b>{name.endsWith('Building') ? name : name + ' Building'}</b> {addr === 'NONE' ? 'does not have an address' : <>is located {atOn} <a href={BuildingMaps[buildingType]} className="text-primary shine" target="_blank" rel="noopener noreferrer">{BuildingAddresses[buildingType]}</a></>}.
                    <br/><br/>
                    {BuildingDescriptions[buildingType] || 'This building does not have a description.'}
                    <div className={cardStyles.separator}></div>
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <span className="text-primary-light">
                                    <MdiIcon path={mdiClockFast} size="24px" className={`fa-fw ${cardStyles.cardModalTitleIcon} mr-2`} />
                                    <b>Building Hours</b>
                                </span>
                            </div>
                            <div className="mt-3">
                                <ul className={cardStyles.liShift}>
                                    {
                                        !marker.hours?.length && (
                                            <span className={cardStyles.liShift}>Hours are not available for this building.</span>
                                        )
                                    }

                                    {
                                        !!marker.hours?.length && marker.hours.map(key => (
                                            <li key={key.day} className={cardStyles.dataEntryList}>
                                                <div className={cardStyles.dataEntry}>
                                                    <div className={cardStyles.head}>
                                                        <h6 className={`text-dark font-weight-bold`}>{dayMappings.find(({ i }) => i === parseInt(key.day))?.day ?? key.day}</h6>
                                                    </div>
                                                    <div className={cardStyles.divider}></div>
                                                    <div className={cardStyles.value}>
                                                        <h6 className={`text-dark`}>{key.open} - {key.close}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <span className="text-primary-light">
                                    <MdiIcon path={mdiCalendarBlankMultiple} size="24px" className={`fa-fw ${cardStyles.cardModalTitleIcon} mr-2`} />
                                    <b>Events</b>
                                </span>
                            </div>
                            <div className="mt-3">
                                <ul className={`${cardStyles.liShift} text-dark`}>
                                    <span className={cardStyles.liShift}>Events are not available for this building.</span>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cardStyles.separator}></div>
                    <div>
                        <span className="text-primary-light">
                            <MdiIcon path={mdiSignText} size="24px" className={`fa-fw ${cardStyles.cardModalTitleIcon} mr-2`} />
                            <b>Directory</b>
                        </span>
                        <div className="mt-4 ml--1">
                            <BuildingDirectory marker={marker} />
                        </div>
                    </div>
                </span>
        </Modal>
    )
}