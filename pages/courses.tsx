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
import styles from '../components/styling/home.module.css';

import { CoursePayload } from '../hooks';
import { isMobile } from 'react-device-detect';
import { UConnServiceStatus } from '@ilefa/husky';

import {
    CourseFilteredResults,
    CourseSearchBar,
    Footer,
    Nav,
    StatusRibbon
} from '../components';

const CoursesPage = () => {
    const [suggestions, setSuggestions] = React.useState<CoursePayload[]>([]);

    return (
        <main>
            <Nav />
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={styles.pageHeader}>
                        <StatusRibbon
                            track={['catalog', 'phonebook']}
                            ignore={[UConnServiceStatus.REPORTING, UConnServiceStatus.UNKNOWN]}
                            dismissible />
                        <div className={`container shape-container d-flex align-items-center py-lg ${isMobile ? styles.headerHeightMobile : styles.headerHeight}`}>
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${styles.nameTitle} text-white display-1`}>Courses</h1>
                                        <h2 className={`${styles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            Search for courses, find detailed information about them, and see where they're located.
                                        </h2>
                                        
                                        <CourseSearchBar setSuggestions={setSuggestions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section section-lg background-circuits mt--9">
                    <div className="container">
                        <CourseFilteredResults suggestions={suggestions} />
                    </div>
                </section>                
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default CoursesPage;
