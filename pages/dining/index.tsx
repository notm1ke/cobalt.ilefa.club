import React from 'react';
import Head from 'next/head';
import MdiIcon from '@mdi/react';

import styles from '../../components/styling/building.module.css';
import globalStyles from '../../components/styling/home.module.css';
import ribbonStyles from '../../components/styling/ribbon.module.css';

import { mdiCookie } from '@mdi/js';
import { intToWords } from '../../util';
import { useDiningHalls } from '../../hooks';
import { DiningHallCard, Footer, Nav, Ribbon } from '../../components';

const DiningHallsPage = () => {
    const [data, loading, error] = useDiningHalls({});
    
    const betaNotice = true;
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
                                <Ribbon
                                    color="primary"
                                    className="mt-5 mb--4 ml-md-5 mr-md-5"
                                    icon={<MdiIcon path={mdiCookie} size="25px" className={ribbonStyles.mdiIcon} />}
                                    dismissible
                                >
                                    The dining halls integration is currently in <b>beta</b> — please report any bugs you may find.
                                </Ribbon>
                            )
                        }
                        <div className="container shape-container d-flex align-items-center py-lg">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1 ${styles.titleLineHeight}`}>Dining Halls</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-3`}>
                                            Explore {data?.length ? intToWords(data.length) + ' different' : ''} dining halls at Storrs.
                                        </h2>
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
