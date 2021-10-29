import React from 'react';
import Head from 'next/head';
import MdiIcon from '@mdi/react';

import styles from '../components/styling/building.module.css';
import globalStyles from '../components/styling/home.module.css';

import { intToWords } from '../util';
import { useDiningHalls } from '../hooks';
import { mdiAlert, mdiCookie, mdiLoading } from '@mdi/js';
import { DiningHallCard, Footer, Nav, PreviewRibbon } from '../components';

const DiningHallsPage = () => {
    const [data, loading, error] = useDiningHalls({ poll: 10000 });
    
    const betaNotice = false;
    const enabled = !loading
        && !error
        && data;

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
                        {
                            betaNotice && (
                                <PreviewRibbon
                                    mdiIcon
                                    icon={mdiCookie}
                                    content={
                                        <>
                                            The dining halls integration is currently in <b>beta</b> — please report any bugs you may find.
                                        </>
                                    }
                                />
                            )
                        }
                        <div className="container shape-container d-flex align-items-center py-lg mt-2 mb--2">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1 ${styles.titleLineHeight}`}>Dining Halls</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-3`}>
                                            { !enabled && error && <span><MdiIcon path={mdiAlert} size="24px" /> Something went wrong</span> }
                                            { !enabled && !error && <span><MdiIcon path={mdiLoading} size="24px" spin /> Loading..</span> }
                                            { enabled && <span>Explore {data?.length ? intToWords(data.length) + ' different' : ''} dining halls at Storrs.</span> }
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
                                enabled &&
                                    data! 
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map(hall => (
                                            <div className="col-md-4" key={hall.name}>
                                                <DiningHallCard hall={hall} />
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
