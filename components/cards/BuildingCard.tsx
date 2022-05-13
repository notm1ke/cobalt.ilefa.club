/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import Link from 'next/link';
import MdiIcon from '@mdi/react';
import styles from '../styling/building.module.css';
import cardStyles from '../styling/card.module.css';

import { Badge } from 'reactstrap';
import { BuildingCodeKey } from '../../hooks';
import { BuildingCode, CampusType } from '@ilefa/husky';
import { mdiFeatureSearch, mdiInformation, mdiMapSearch } from '@mdi/js';

import {
    BuildingAddresses,
    BuildingDescriptions,
    BuildingMaps,
    getIconForBuilding
} from '../../util';

export interface BuildingCardProps {
    buildingType: BuildingCodeKey;
    campus: CampusType | undefined;
}

const getCampusBadge = (campusType: CampusType | undefined) => {
    let temp = campusType?.toLowerCase();

    if (!campusType || !temp)
        return <Badge color="dark" className="vaTextBottom text-lowercase" pill>n/a</Badge>;

    if (temp === 'storrs')
        return <Badge color="primary" className="vaTextBottom text-lowercase" pill>Storrs</Badge>

    if (temp === 'hartford')
        return <Badge color="success" className="vaTextBottom text-lowercase" pill>Hartford</Badge>

    if (temp === 'stamford')
        return <Badge color="yellow" className="vaTextBottom text-lowercase" pill>Stamford</Badge>

    if (temp === 'avery_point')
        return <Badge color="warning" className="vaTextBottom text-lowercase" pill>Avery Point</Badge>

    if (temp === 'waterbury')
        return <Badge color="magenta" className="vaTextBottom text-lowercase" pill>Waterbury</Badge>
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ buildingType, campus }) => {
    let icon = getIconForBuilding(buildingType, '', 20);
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
                                    {icon ?? ''} {name} {getCampusBadge(campus?.toLowerCase() as CampusType)}
                                </a>
                            </Link>
                        </h5>

                        <p>
                            <b>{addr === 'NONE' ? <>The <b>{name.endsWith('Building') ? name : name + ' Building'}</b> does not have an address.</> : <>Located {atOn} <a href={BuildingMaps[buildingType]} className="shine" target="_blank" rel="noopener noreferrer">{BuildingAddresses[buildingType]}</a></>}.</b>
                            <div className={`${styles.projectCardLink} mt-3 mb-4`}>
                                <Link href={`/buildings/${buildingType}`}>
                                    <a className="btn btn-dark btn-sm text-lowercase shine">
                                        <MdiIcon path={mdiFeatureSearch} size="20px" className="fa-fw" /> directory
                                    </a>
                                </Link>

                                <Link href={BuildingMaps[buildingType]}>
                                    <a className="btn btn-dark btn-sm text-lowercase shine">
                                        <MdiIcon path={mdiMapSearch} size="20px" className="fa-fw" /> google maps
                                    </a>
                                </Link>
                                
                                <Link href={`https://maps.uconn.edu/m/info/${buildingType}`}>
                                    <a className="btn btn-dark btn-sm text-lowercase shine">
                                        <MdiIcon path={mdiInformation} size="20px" className="fa-fw" /> info
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