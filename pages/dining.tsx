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

import styles from '../components/styling/building.module.css';
import globalStyles from '../components/styling/home.module.css';

import { intToWords } from '../util';
import { mdiAlert, mdiLoading } from '@mdi/js';
import { useDiningHalls, useLocalStorage } from '../hooks';

import {
    DevElement,
    DiningHallCard,
    DiningHallMetricsCard,
    DiningHallSiteCard,
    Footer,
    Nav
} from '../components';

const DiningHallsPage = () => {
    const [data, loading, error] = useDiningHalls({ poll: 10000 });
    const [favorites, setFavorites] = useLocalStorage<string[]>('diningFavorites', []);
    
    const enabled = !loading
        && !error
        && data
        && data.halls;

    return (
        <main>
            <Head>
                <title>Cobalt » Dining Halls</title>
                <meta name="description" content={`Explore dining halls and their menus throughout the Storrs campus.`} />
            </Head>
            <Nav/>
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={globalStyles.pageHeader}>
                        <div className="container shape-container d-flex align-items-center py-lg mt-2 mb--2">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1 ${styles.titleLineHeight}`}>Dining Halls</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-3`}>
                                            { !enabled && error && <span><MdiIcon path={mdiAlert} size="24px" /> Something went wrong</span> }
                                            { !enabled && !error && <span><MdiIcon path={mdiLoading} size="24px" spin /> Loading..</span> }
                                            { enabled &&
                                                (
                                                    <>
                                                        <span>Explore {intToWords(data!.halls.length)} different dining halls at Storrs.</span>
                                                        <div className="mt-2"><small className={styles.proTip}><b>Protip:</b> Click on food items to favorite them</small></div>
                                                    </>
                                                )
                                            }
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.buildingSection} background-circuits mt--3`}>
                    <div className="container mt--3" id="body">
                        <div className="row">
                            {
                                enabled && (
                                    <>
                                        <div className="col-md-4">
                                            <DiningHallSiteCard favorites={favorites} setFavorites={setFavorites} />
                                        </div>
                                    </>
                                )
                            }

                            <DevElement>
                                <div className="col-md-4">
                                    <DiningHallMetricsCard loading={loading} error={error} timings={data?.timings} />
                                </div>
                            </DevElement>
                            
                            {
                                enabled &&
                                    data!
                                        .halls
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map(hall => (
                                            <div className="col-md-4" key={hall.name}>
                                                <DiningHallCard
                                                    hall={hall}
                                                    hasMeals={hall.hasMeals}
                                                    favorites={favorites}
                                                    setFavorites={setFavorites}
                                                />
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

export default DiningHallsPage;
