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
import cardStyles from '../../components/styling/card.module.css';
import globalStyles from '../../components/styling/home.module.css';
import searchStyles from '../../components/styling/search.module.css';

import { CampusType } from '@ilefa/husky';
import { useEffect, useState } from 'react';
import { Footer, Nav } from '../../components';
import { InputGroupAddon, InputGroupText } from 'reactstrap';
import { mdiAlert, mdiLoading, mdiMagnify } from '@mdi/js';
import { BluesignFreeRoomPayload, useFreeRooms } from '../../hooks';
import { CustomScheduleEntry, getDateFromTime, getLatestTimeValue } from '../../util';

interface AvailableRoomCardProps {
    room: BluesignFreeRoomPayload;
}

const getFreeDuration = (name: string, next: CustomScheduleEntry[]) => {
    if (!next || !next.length) return (
        <span className="text-dark">
            <b className="text-success roomScheduleStatus">
                <i className="fas fa-calendar-check fa-fw"></i> {name}
            </b> is free.
        </span>
    )

    if (next && next[0]) return (
        <span className="text-dark">
            <b className="text-warning roomScheduleStatus">
                <i className="fas fa-clock fa-fw"></i> {name}
            </b> is free for another <span className="text-purple">{getLatestTimeValue(Math.abs(getDateFromTime(next[0].start).getTime() - Date.now()))}</span>.
        </span>
    )
}

const AvailableRoomCard: React.FC<AvailableRoomCardProps> = ({ room }) => {
    let { room: name } = room.room;
    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div>
                    <h5>
                        <a className={`${cardStyles.cardSectionTitle} text-primary-light pointer`}>
                            {name}
                        </a>
                    </h5>

                    <p className="text-dark">
                        {getFreeDuration(name, room.nextEvents)}
                    </p>
                </div>
            </div>
        </div>
    )
};

const SITE_NAMES: CampusType[] = ['storrs', 'hartford', 'stamford', 'avery_point', 'waterbury'];

type SiteState = {
    site: CampusType;
    state: boolean;
}

const BuildingsPage = () => {
    const [search, setSearch] = useState('');
    const [sites, setSites] = useState<SiteState[]>(SITE_NAMES.map(site => ({ site, state: true })));
    const [results, setResults] = useState<BluesignFreeRoomPayload[]>([]);

    const [response, _url, loading, error] = useFreeRooms({
        site: sites
            .map(site => site.state ? site.site : null)
            .filter(site => site !== null) as CampusType[],
        pollTime: 60000
    });

    const resetResults = () => setResults(response!.rooms!);

    const predicates: ((input: string, room: BluesignFreeRoomPayload) => boolean)[] = [
        (input, { room }) => room.room.toLowerCase().includes(input)
            || room.room.toLowerCase().slice(0, input.length) === input.toLowerCase()
    ];

    const onSearch = (query: string) => {
        setSearch(query);

        if (!query || !query.trim())
            return resetResults();

        return filter(query);
    }

    const filter = (query: string) => setResults(
        response!.rooms!
            .filter(room => predicates
                .some(predicate => predicate(query, room))));

    const getSiteStatus = (site: CampusType) => sites.find(s => s.site === site)!.state;

    const toggleSite = (site: CampusType) => {
        let siteState = getSiteStatus(site);
        setSites(sites.map(s => s.site === site ? { site, state: !siteState } : s));
    }

    const enabled = !loading && !error && !!response;

    useEffect(() => {
        if (!enabled)
            return;

        setResults(response!.rooms!);
    }, [enabled]);

    useEffect(() => {
        if (sites.every(site => !site.state))
            setSites(sites.map(site => ({ ...site, state: true })));
    }, [sites]);

    return (
        <main>
            <Head>
                <title>Cobalt » Available Rooms</title>
                <meta name="description" content={`Explore which rooms are available.`} />
            </Head>
            <Nav />
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={globalStyles.pageHeader}>
                        <div className="container shape-container d-flex align-items-center py-lg">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>Available Rooms</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            {loading && <><MdiIcon path={mdiLoading} spin={true} size={1} /> Loading..</>}
                                            {error && <><MdiIcon path={mdiAlert} size={1} /> Something went wrong</>}
                                            {!loading && !error && <>{response?.rooms.length} rooms are currently available</>}
                                        </h2>

                                        <div className="input-group-alternative mb-4 input-group">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <span>
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
                                                    placeholder={loading ? 'Loading..' : error ? 'Something went wrong..' : 'Search for any building or room..'}
                                                    className="form-control-alternative form-control"
                                                    onChange={e => onSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {!loading && !error && (
                                    <div className="row align-items-center justify-content-center">
                                        {SITE_NAMES.map(site => {
                                            let state = getSiteStatus(site);
                                            return (
                                                <div className="col-md-3 mr--6">
                                                    <a className={`btn ${state === true ? 'btn-success' : 'btn-dark bg-ilefa-dark'} shine btn-icon mt-3 mb-sm-0 text-capitalize w-75 ${styles.siteBtn}`} onClick={() => toggleSite(site)}>
                                                        <b>{site.replace(/_/g, ' ')}</b> {state && `(${response!.sites[site]})`}
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.buildingSection} background-circuits`}>
                    <div className="container" id="body">
                        <div className="row">
                            {
                                enabled && results
                                    .sort((a, b) => a?.room?.room?.localeCompare((b?.room?.room)))
                                    .map((ent: BluesignFreeRoomPayload) => (
                                        <div className="col-md-4 align-items-stretch" key={ent?.room?.room}>
                                            <AvailableRoomCard room={ent} />
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
