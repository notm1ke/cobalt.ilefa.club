/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import React from 'react';
import Head from 'next/head';
import MdiIcon from '@mdi/react';

import styles from '../components/styling/building.module.css';
import globalStyles from '../components/styling/home.module.css';
import searchStyles from '../components/styling/search.module.css';

import { useEffect, useState } from 'react';
import { BuildingPayload, useBuildings } from '../hooks';
import { BuildingRoomCard, Footer, Nav } from '../components';
import { InputGroupAddon, InputGroupText, UncontrolledTooltip } from 'reactstrap';

import {
    mdiAlert,
    mdiInformation,
    mdiLoading,
    mdiMagnify,
    mdiMapSearch
} from '@mdi/js';

import {
    BuildingAddresses,
    BuildingDescriptions,
    BuildingMaps,
    CampusSorting,
    getIconForBuilding,
    intToWords
} from '../util';

const BuildingsPage = () => {
    const [buildings, loading, error] = useBuildings();

    const [search, setSearch] = useState('');
    const [hideNoRooms, setHideNoRooms] = useState(true);
    const [results, setResults] = useState<BuildingPayload[]>([]);

    const toggleNoRooms = () => setHideNoRooms(!hideNoRooms);
    const resetResults = () => setResults(buildings!);

    const predicates: ((input: string, building: BuildingPayload) => boolean)[] = [
        (input, { name }) => name.toLowerCase().includes(input)
                                || name.toLowerCase().slice(0, input.length) === input.toLowerCase(),
        (input, { code }) => code.toLowerCase().includes(input)
                                || code.toLowerCase().slice(0, input.length) === input.toLowerCase()
                                || BuildingDescriptions[code]?.toLowerCase()?.includes(input)
                                || BuildingAddresses[code]?.toLowerCase()?.includes(input),
        (input, { rooms }) => rooms.some(room => room.name.toLowerCase().slice(0, input.length) === input.toLowerCase())
                                || rooms.some(room => room.name.toLowerCase().includes(input))
                                || rooms[0]?.building.campus.toLowerCase().includes(input)
                                || rooms[0]?.building.campus.toLowerCase().startsWith(input)
    ];

    const onSearch = (query: string) => {
        setSearch(query);

        if (!query || !query.trim())
            return resetResults();

        return filter(query);
    }

    const filter = (query: string) => setResults(
        buildings!
        .filter(building => predicates
            .some(predicate => predicate(query, building))));

    const enabled = !loading
        && !error
        && buildings;

    useEffect(() => {
        if (!enabled)
            return;

        setResults(buildings!);
    }, [enabled]);

    return (
        <main>
            <Head>
                <title>Cobalt » Buildings</title>
                <meta name="description" content={`Explore buildings around all UConn campuses.`} />
            </Head>
            <Nav/>
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={globalStyles.pageHeader}>
                        <div className="container shape-container d-flex align-items-center py-lg">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>Buildings</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            Explore {buildings?.length ? intToWords(buildings.length) + ' different' : ''} buildings around five of UConn's campuses
                                        </h2>
                                        <div className="input-group-alternative mb-4 input-group">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <span className={enabled ? 'cursor-pointer shine' : ''} onClick={() => toggleNoRooms()} id="tooltip-adv-filter">
                                                        <MdiIcon
                                                            size="20px"
                                                            className={error ? 'text-danger' : 'text-gray'}
                                                            spin={loading}
                                                            path={loading
                                                                ? mdiLoading
                                                                : error
                                                                    ? mdiAlert
                                                                    : mdiMagnify}
                                                        />
                                                    </span>
                                                    <UncontrolledTooltip delay={0} placement="top" target="tooltip-adv-filter">
                                                        Click to {hideNoRooms ? 'show' : 'hide'} buildings with no rooms
                                                    </UncontrolledTooltip>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <div className={searchStyles.inputBoxRadius}>
                                                <input
                                                    type="text"
                                                    value={search}
                                                    disabled={!enabled}
                                                    placeholder={loading ? 'Loading..' : error ? 'Something went wrong..' : 'Search for any building, room, or campus..'}
                                                    className="form-control-alternative form-control"
                                                    onChange={e => onSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.buildingSection} background-circuits`}>
                    <div className="container" id="body">
                        {
                            enabled && results
                                .filter(({ rooms }) => {
                                    if (hideNoRooms)
                                        return rooms.length > 0;
                                    return true;
                                })
                                .sort((a, b) => CampusSorting[a.rooms[0]?.building.campus] - CampusSorting[b.rooms[0]?.building.campus])
                                .map(building => {
                                    let name = building.name;
                                    let addr = BuildingAddresses[building.code];
                                    if (!addr) addr = 'NONE';

                                    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'on' : 'at';
                                    return (
                                        <h4 className={`text-white ${styles.buildingSectionTitle} mb-7`} id={building.code} key={building.code}>
                                            { getIconForBuilding(building.code as any, styles.buildingIcon, 24) } {building.name} ({building.code})
                                            <br/><span className={`text-white ${styles.buildingSectionBody}`}>
                                                The <b>{name.endsWith('Building') ? name : name + ' Building'}</b> {addr === 'NONE' ? 'does not have an address' : <>is located {atOn} <a href={BuildingMaps[building.code]} className={`text-light ${styles.buildingLink} shine`} target="_blank" rel="noopener noreferrer">{BuildingAddresses[building.code]}</a></>}.
                                                <br/>
                                                {BuildingDescriptions[building.code] || 'This building does not have a description.'}
                                                <br/>
                                                <a href={BuildingMaps[building.code]} className="btn btn-dark bg-ilefa-dark shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                                    <span className="btn-inner--icon"><MdiIcon path={mdiMapSearch} size="20px" /></span>
                                                    <span className="btn-inner--text">View on Google Maps</span>
                                                </a>
                                                <a href={`https://maps.uconn.edu/m/info/${building.code}`} className="btn btn-dark bg-ilefa-dark shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                                    <span className="btn-inner--icon"><MdiIcon path={mdiInformation} size="20px" /></span>
                                                    <span className="btn-inner--text">Information</span>
                                                </a>
                                                <div className="row">
                                                    {
                                                        building.rooms.map(room => (
                                                            <div className="col-md-4" key={room.name}>
                                                                <BuildingRoomCard room={room} key={room.name} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </span>
                                        </h4>
                                    )
                                })
                        }
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default BuildingsPage;
