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

import React from 'react';
import Head from 'next/head';
import MdiIcon from '@mdi/react';

import styles from '../../components/styling/building.module.css';
import globalStyles from '../../components/styling/home.module.css';

import { useDorms } from '../../hooks';
import { mdiAlert, mdiFlask, mdiLoading } from '@mdi/js';
import { DormHallCard, Footer, Nav, PreviewRibbon } from '../../components';

import {
    DormHallCategory,
    DormsByType,
    getIconForResHallType,
    intToWords
} from '../../util';

const DormsPage = () => {
    const [data, loading, error] = useDorms();
    
    const betaNotice = false;
    const enabled = !loading
        && !error
        && data;

    return (
        <main>
            <Head>
                <title>Cobalt » Residence Halls</title>
                <meta name="description" content={`Explore residence halls and room pictures all throughout the Storrs campus.`} />
            </Head>
            <Nav/>
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={globalStyles.pageHeader}>
                        {
                            betaNotice && (
                                <PreviewRibbon
                                    mdiIcon
                                    icon={mdiFlask}
                                    content={
                                        <>
                                            The residential halls integration is currently in <b>beta</b> — please report any bugs you may find — and a special thanks to the{" "}
                                            <a className="text-white font-weight-700 shine" href="https://reddit.com/r/UConnDorms" target="_blank" rel="noopener noreferrer">r/UConnDorms</a> team!
                                        </>
                                    }
                                />
                            )
                        }
                        <div className="container shape-container d-flex align-items-center py-lg">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1 ${styles.titleLineHeight}`}>Residential Buildings</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-3`}>
                                            { !enabled && !error && <span><MdiIcon path={mdiLoading} size="24px" spin /> Loading..</span> }
                                            { !enabled && error && <span><MdiIcon path={mdiAlert} size="24px" /> Something went wrong</span> }
                                            { enabled && <>Explore {data?.dorms?.length ? intToWords(data.dorms.length) + ' different' : ''} residence halls at Storrs.</> }
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.buildingSection} background-circuits`}>
                    <div className="container" id="body">
                        {
                            enabled && (
                                Object
                                    .keys(DormsByType)
                                    .map(type => ({ type, dorms: data!.dorms.filter(dorm => dorm.type === type) }))
                                    .map(({ type, dorms }) => (
                                        <>
                                            <h4 className={`text-white ${styles.buildingSectionTitle} mb-7`} key={type}>
                                                <span className="text-white">{ getIconForResHallType(type as keyof typeof DormsByType, styles.buildingIcon, 24) } {DormHallCategory[type]}</span>
                                                <div className="row">
                                                    {
                                                        dorms
                                                            .sort((a, b) => a.hall.localeCompare(b.hall))
                                                            .map(dorm => (
                                                                <div className="col-md-4" key={dorm.hall}>
                                                                    <DormHallCard dorm={dorm} />
                                                                </div>
                                                            ))
                                                    }
                                                </div>
                                            </h4>
                                        </>
                                    ))
                            )
                        }
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default DormsPage;
