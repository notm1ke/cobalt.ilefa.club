import React from 'react';
import Head from 'next/head';

import styles from '../components/styling/building.module.css';
import globalStyles from '../components/styling/home.module.css';

import {
    Footer,
    Nav,
    RecCapacityCard,
    RecHistoricalDailyCard,
    RecHistoricalWeeklyCard,
    RecInsightsCard,
    RecOccupancyCard,
    RecOccupancyProvider,
    RecStatusCard,
    RecUntilCloseTagline
} from '../components';

const RecCenterPage = () => {
    return (
        <main>
            <Head>
                <title>Cobalt » Rec Center</title>
                <meta name="description" content="Explore traffic information for the UConn Storrs Rec Center." />
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
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1 ${styles.titleLineHeight}`}>Rec Center</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-3`}>
                                            <RecUntilCloseTagline />
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
                            <div className="col-md-4">
                                <RecOccupancyProvider pollTime={60000}>
                                    <RecOccupancyCard />
                                    <RecCapacityCard />
                                </RecOccupancyProvider>
                                <RecInsightsCard />
                                <RecStatusCard />
                            </div>
                            <div className="col-md-8">
                                <RecHistoricalDailyCard />
                                <RecHistoricalWeeklyCard />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default RecCenterPage;
