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

import Head from 'next/head';
import MdiIcon from '@mdi/react';

import styles from '../components/styling/card.module.css';

import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DiningHallType } from '@ilefa/blueplate';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { MarkerPayload, useCartographer } from '../hooks';
import { mdiDomain, mdiMedal, mdiStar } from '@mdi/js';

import {
    DAYLIGHT_SAVINGS,
    getDateFromTime,
    getIconForBuilding,
    getIconForDiningHall,
    getIconForResHall
} from '../util';

import {
    AcademicMarker,
    AthleticsMarker,
    BuildingInspection,
    DevPage,
    DiningHallInspection,
    DiningHallMarker,
    DormMarker,
    HoverablePopover,
    MiscMarker,
    PointOfInterestMarker
} from '../components';

type PopoverEntry = {
    name: string;
    state: boolean;
}

enum BuildingColorType {
    ACADEMIC = 'text-primary',
    RESIDENTIAL = 'text-green',
    DINING = 'text-warning',
    ATHLETICS = 'text-danger',
    POI = 'text-purple',
    OTHER = 'text-gray'
}

const IMPLEMENTED_MARKERS = [
    'academic', 'dining'
]

const MapsPage = () => {
    const [markers, loading, error] = useCartographer();
    const [popovers, setPopovers] = useState<PopoverEntry[]>([]);
    const [activeModal, setActiveModal] = useState<JSX.Element>();

    const icons = {
        academic: 'rgb(41, 96, 144)',
        residential: 'rgb(65, 146, 40)',
        dining: 'rgb(189, 138, 46)',
        athletics: 'rgb(135, 25, 18)',
        poi: 'rgb(90, 13, 142)',
        other: 'rgb(74, 74, 74)'
    }

    const togglePopover = (ent: MarkerPayload, state: boolean) => {
        if (isMobile)
            return;

        let popup = popovers.find(p => p.name === ent.name);
        if (!popup) return setPopovers([...popovers, { name: ent.name, state }]);
        if (popup.state) return updateEntry(ent.name, false);

        return updateEntry(ent.name, true);
    }

    const getStateForPopover = (ent: MarkerPayload) => {
        let popup = popovers.find(p => p.name === ent.name);
        if (!popup) return false;

        return popup.state;
    }

    const updateEntry = (name: string, state: boolean) =>
        setPopovers(popovers.map(p => p.name === name
            ? { name, state }
            : p
        ));

    const isOpen = (ent: MarkerPayload): boolean | null => {
        if (!ent.hours || !ent.hours.length)
            return null;

        // check hours to see if current time means it's open
        const now = new Date();
        if (now.getTimezoneOffset() === 0) {
            now.setHours(now.getHours() - 4);
            DAYLIGHT_SAVINGS && now.setHours(now.getHours() - 1);
        }
    
        let day = now.getDay();

        let hours = ent.hours[day];
        if (!hours || hours.open === '' || hours.close === '')
            return null;

        let start = getDateFromTime(hours.open);
        let end = getDateFromTime(hours.close);

        return now.getTime() >= start.getTime()
            && now.getTime() <= end.getTime();
    }

    const getMarkerElementForType = (ent: MarkerPayload) => {
        if (ent.type === 'academic')
            return <AcademicMarker marker={ent} />

        if (ent.type === 'athletics')
            return <AthleticsMarker marker={ent} />

        if (ent.type === 'dining')
            return <DiningHallMarker marker={ent} />

        if (ent.type === 'poi')
            return <PointOfInterestMarker marker={ent} />

        if (ent.type === 'residential')
            return <DormMarker marker={ent} />

        if (ent.type === 'other')
            return <MiscMarker marker={ent} />
    }

    const getModal = (payload: MarkerPayload) => {
        if (payload.type === 'dining' && payload.diningHallType)
            return <DiningHallInspection
                hallType={payload.diningHallType as keyof typeof DiningHallType} 
                open={true}
                setOpen={() => setActiveModal(<></>)} 
            />

        if (payload.type === 'academic' && payload.classroomPrefixes && payload.classroomPrefixes.length)
            return <BuildingInspection
                marker={payload}
                open={true}
                setOpen={() => setActiveModal(<></>)}
            />

        return <></>;
    }

    const getHeaderIconForMarker = (ent: MarkerPayload) => {
        if (ent.type === 'academic')
            return getIconForBuilding(ent.classroomPrefixes![0] as any, 'fa-fw vaSub');

        if (ent.type === 'athletics')
            return <MdiIcon path={mdiMedal} size="16px" className="fa-fw vaSub" />;
        
        if (ent.type === 'dining')
            return getIconForDiningHall(ent.diningHallType! as keyof typeof DiningHallType, 'fa-fw vaSub');

        if (ent.type === 'poi')
            return <MdiIcon path={mdiStar} size="16px" className="fa-fw vaSub" />;

        if (ent.type === 'residential')
            return getIconForResHall(ent.residenceHallType! as any, 'fa-fw vaSub');

        if (ent.type === 'other')
            return <MdiIcon path={mdiDomain} size="16px" className="fa-fw vaSub" />;
    }

    return (
        <DevPage>
            <Head>
                <title>Cobalt Maps</title>
                <meta name="description" content="Explore the UConn Storrs campus using a highly integrated campus map." />
            </Head>
            <Map  
                defaultCenter={[41.8059613, -72.2509286]}
                height={300}
                boxClassname="map-container"
                defaultZoom={17}
                metaWheelZoom={false}
                attributionPrefix={
                    <span>
                        <a href="https://ilefa.club" className="text-primary font-weight-bold shine" target="_blank" rel="noreferrer noopener">
                            ILEFA Labs
                        </a>
                    </span>
                }

            >
                <ZoomControl />
                {
                    markers && !loading && !error &&
                        markers
                            // .filter(marker => IMPLEMENTED_MARKERS.includes(marker.type))
                            .map(ent => (
                                <Marker
                                    key={ent.position.lat + ent.position.lng}
                                    anchor={[ent.position.lat, ent.position.lng]}
                                    onClick={() => IMPLEMENTED_MARKERS.includes(ent.type) && setActiveModal(getModal(ent))}
                                    color={icons[(ent as MarkerPayload).type ?? 'other']}
                                    width={40}
                                    className={ent.name.replace(/[\s._/\\&]/g, '')}
                                    onMouseOver={() => !isMobile && togglePopover(ent, true)}
                                    onMouseOut={() => !isMobile && togglePopover(ent, false)}
                                />
                            ))
                }
                {
                    markers && !loading && !error &&
                        markers
                            // .filter(marker => IMPLEMENTED_MARKERS.includes(marker.type))
                            .map(ent => {
                                let open = isOpen(ent);
                                let displayStatus = open !== null;
                                let marker = getMarkerElementForType(ent);

                                return (
                                    <HoverablePopover
                                        active={getStateForPopover(ent)}
                                        setActive={() => togglePopover(ent, !getStateForPopover(ent))}
                                        placement="top"
                                        key={ent.name.replace(/[\s./\\&]/g, '')} 
                                        target={'.' + ent.name.replace(/[\s./\\&]/g, '')}
                                        header={
                                            <span className={`${BuildingColorType[ent.type.toUpperCase()]} font-weight-bold`}>
                                                {getHeaderIconForMarker(ent)} {ent.name}
                                                {
                                                    displayStatus
                                                        ? open
                                                            ? <span className="text-success"> (Open)</span>
                                                            : <span className="text-danger"> (Closed)</span>
                                                        : ''
                                                }
                                            </span>
                                        }
                                        headerProps={{
                                            className: styles.popoverCardTitle
                                        }}
                                    >
                                        {marker}
                                    </HoverablePopover>
                                )
                            })
                }
            </Map>
            { activeModal && {...activeModal} }
        </DevPage>
    );
}

export default MapsPage;