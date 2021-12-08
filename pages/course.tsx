import React from 'react';
import Head from 'next/head';

import styles from '../components/styling/building.module.css';
import globalStyles from '../components/styling/home.module.css';

import { CobaltSearch, DevPage, Footer, Nav } from '../components';

const CoursePage = () => {
    return (
        <DevPage>
            <main>
                <Head>
                    <title>Cobalt » Courses</title>
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
                                            <h1 className={`${globalStyles.nameTitle} text-white display-1`}>Courses</h1>
                                            <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                                Explore NaN courses
                                            </h2>
                                            <CobaltSearch feelingSilly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className={`section ${styles.buildingSection} background-circuits`}>
                        <div className="container" id="body">
                            
                        </div>
                    </section>
                    <Footer className="background-circuits" white />
                </div>
            </main>
        </DevPage>
    );
}

export default CoursePage;
