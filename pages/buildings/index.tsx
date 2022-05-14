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

import styles from '../../components/styling/building.module.css';
import globalStyles from '../../components/styling/home.module.css';
import searchStyles from '../../components/styling/search.module.css';

import { CampusType } from '@ilefa/husky';
import { useEffect, useState } from 'react';
import { BuildingCard, Footer, Nav } from '../../components';
import { InputGroupAddon, InputGroupText } from 'reactstrap';
import { mdiAlert, mdiLoading, mdiMagnify } from '@mdi/js';
import { BuildingCodeKey, BuildingPayload, useBuildings } from '../../hooks';

import {
    BuildingAddresses,
    BuildingDescriptions,
    CampusSorting,
    intToWords
} from '../../util';

const BuildingsPage = () => {
    const [buildings, loading, error] = useBuildings();

    const [search, setSearch] = useState('');
    const [results, setResults] = useState<BuildingPayload[]>([]);

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
                                                    <span className={enabled ? 'cursor-pointer shine' : ''}>
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
                        <div className="row">
                            {
                                enabled && results
                                    .sort((a, b) => CampusSorting[a.rooms[0]?.building.campus] - CampusSorting[b.rooms[0]?.building.campus])
                                    .map(building => (
                                        <div className="col-md-6 d-flex align-items-stretch">
                                            <BuildingCard buildingType={building.code as BuildingCodeKey} campus={building.rooms[0]?.building.campus as CampusType} key={building.code} />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default BuildingsPage;
