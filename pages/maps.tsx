import Head from 'next/head';
import styles from '../components/styling/card.module.css';

import { useState } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { DiningHallType } from '@ilefa/blueplate';
import { MarkerPayload, useCartographer } from '../hooks';
import { DAYLIGHT_SAVINGS, getDateFromTime } from '../util';
import { DevPage, DiningHallInspection, HoverablePopover } from '../components';

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

        console.log(ent.hours);

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

    // const getModal = (payload: MarkerPayload) => {
    //     if (payload.type === 'dining' && payload.diningHallType)
    //         return <DiningHallInspection
    //             buildingType={payload.diningHallType as keyof typeof DiningHallType} 
    //             open={true}
    //             setOpen={() => setActiveModal(<></>)} 
    //         />

    //     return <></>;
    // }

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
            >
                {
                    markers && !loading && !error && markers.map(ent => (
                        <Marker
                            key={ent.position.lat + ent.position.lng}
                            anchor={[ent.position.lat, ent.position.lng]}
                            onClick={() => setActiveModal(<DiningHallInspection buildingType={ent.diningHallType as keyof typeof DiningHallType} open={true} setOpen={() => setActiveModal(<></>)} />)}
                            color={icons[(ent as MarkerPayload).type ?? 'other']}
                            width={40}
                            className={ent.name.replace(/[\s._/\\&]/g, '')}
                            onMouseOver={() => togglePopover(ent, true)}
                            onMouseOut={() => togglePopover(ent, false)}
                        />
                    ))
                }
                {
                    markers && !loading && !error && markers.map(ent => {
                        let open = isOpen(ent);
                        let displayStatus = open !== null;

                        return (
                            <HoverablePopover
                                active={getStateForPopover(ent)}
                                setActive={() => togglePopover(ent, !getStateForPopover(ent))}
                                placement="top"
                                key={ent.name.replace(/[\s./\\&]/g, '')} 
                                target={'.' + ent.name.replace(/[\s./\\&]/g, '')}
                                header={
                                    <span className={`${BuildingColorType[ent.type.toUpperCase()]} font-weight-bold`}>
                                        {ent.name}
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
                                {ent.address && (
                                    <><i className="fas fa-location-arrow fa-fw"></i> <i>{ent.address}</i> <br /><br /></>
                                )}
                                {ent.description ?? `There is no description for ${ent.name}.`}
                                <hr />
                                <span className="text-primary"><i className="fa fa-link fa-fw"></i> Click the marker for more information.</span>
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