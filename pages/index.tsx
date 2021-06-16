import React from 'react';
import styles from '../components/styling/home.module.css';

import { CobaltSearch, Footer, Nav } from '../components';

const HomePage = () => {
    return (
        <main>
            <Nav/>
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={styles.pageHeader}>
                        <div className={`container shape-container d-flex align-items-center py-lg ${styles.headerHeight}`}>
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${styles.nameTitle} text-white display-1`}>Cobalt</h1>
                                        <h2 className={`${styles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            A suite of better course tools built by UConn students, for UConn students.
                                        </h2>
                                        <CobaltSearch />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section section-lg ${styles.sectionSeperator}`}></section>
                <Footer white={true} />
            </div>
        </main>
    );
}

export default HomePage;
