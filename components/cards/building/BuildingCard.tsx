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

import Link from 'next/link';
import MdiIcon from '@mdi/react';
import styles from '../../styling/building.module.css';
import cardStyles from '../../styling/card.module.css';

import { Badge } from 'reactstrap';
import { BuildingCodeKey } from '../../../hooks';
import { BuildingCode, CampusType } from '@ilefa/husky';
import { mdiFeatureSearch, mdiInformation, mdiMap } from '@mdi/js';

import {
    BuildingAddresses,
    BuildingDescriptions,
    BuildingMaps,
    getIconForBuilding
} from '../../../util';

export interface BuildingCardProps {
    buildingType: BuildingCodeKey;
    campus: CampusType | undefined;
}

const getCampusBadge = (buildingType: BuildingCodeKey, campusType: CampusType | undefined) => {
    let temp = campusType?.toLowerCase();
    let maps = BuildingAddresses[buildingType]?.toLowerCase();

    if (!campusType && !maps)
        return <Badge color="dark" className="vaTextBottom" pill>N/A</Badge>;

    if (temp === 'hartford' || maps.includes('hartford'))
        return <Badge color="success" className="vaTextBottom text-capitalize" pill>Hartford</Badge>

    if (temp === 'stamford' || maps.includes('stamford'))
        return <Badge color="yellow" className="vaTextBottom text-capitalize" pill>Stamford</Badge>

    if (temp === 'avery_point' || maps.includes('avery point'))
        return <Badge color="warning" className="vaTextBottom text-capitalize" pill>Avery Point</Badge>

    if (temp === 'waterbury' || maps.includes('waterbury'))
        return <Badge color="purple" className="vaTextBottom text-capitalize" pill>Waterbury</Badge>
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ buildingType, campus }) => {
    let icon = getIconForBuilding(buildingType, 'vaSub', 22);
    let name = BuildingCode[buildingType];
    let addr = BuildingAddresses[buildingType];
    if (!addr) addr = 'NONE';

    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'on' : 'at';

    let def = <><b>{BuildingCode[buildingType]} ({buildingType})</b> does not currently have an available description.</>;
    let description = BuildingDescriptions[buildingType]
        ? BuildingDescriptions[buildingType] === 'There is no description for this building.'
            ? def
            : BuildingDescriptions[buildingType]
        : def;

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <Link href={`/buildings/${buildingType}`}>
                                <a className={`${cardStyles.cardSectionTitle} text-primary-light`}>
                                    {icon ?? ''} {name} {getCampusBadge(buildingType, campus?.toLowerCase() as CampusType)}
                                </a>
                            </Link>
                        </h5>

                        <p>
                            <b>{addr === 'NONE' ? <>The <b>{name.endsWith('Building') ? name : name + ' Building'}</b> does not have an address.</> : <>Located {atOn} <a href={BuildingMaps[buildingType]} className="text-primary shine" target="_blank" rel="noopener noreferrer">{BuildingAddresses[buildingType]}</a></>}.</b>
                            <div className={`${styles.projectCardLink} mt-3 mb-4`}>
                                <Link href={`/buildings/${buildingType}`}>
                                    <a className="btn btn-dark btn-sm text-lowercase shine">
                                        <MdiIcon path={mdiFeatureSearch} size="17px" className="fa-fw vaSub" /> directory
                                    </a>
                                </Link>

                                <Link href={BuildingMaps[buildingType] ?? '#'}>
                                    <a className="btn btn-dark btn-sm text-lowercase shine">
                                        <MdiIcon path={mdiMap} size="17px" className="fa-fw vaMiddle" /> maps
                                    </a>
                                </Link>
                                
                                <Link href={`https://maps.uconn.edu/m/info/${buildingType}`}>
                                    <a className="btn btn-dark btn-sm text-lowercase shine">
                                        <MdiIcon path={mdiInformation} size="17px" className="fa-fw vaSub" /> info
                                    </a>
                                </Link>
                            </div>

                            {description}
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}