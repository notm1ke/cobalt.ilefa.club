import React from 'react';
import Link from 'next/link';
import styles from '../components/styling/home.module.css';

import {
    CobaltSearch,
    DevElement,
    FeatureSection,
    Footer,
    Nav,
} from '../components';

const HomePage = () => (
    <main>
        <Nav />
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
                                        An intelligent suite of tools built by UConn students, for UConn students.
                                    </h2>
                                    <CobaltSearch />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FeatureSection
                title="Courses"
                glyph="/glyphs/course.svg"
                alt="Courses Glyph"
                description={
                    <>
                        Easily search for your courses and find detailed information about what <b>content areas</b> and <b>competencies</b> they fulfill, which <b>sections</b> are running, and how good the <b>professors</b> are all in one place.<br/><br/>
                        <Link href="/info#search-modifiers">
                            <a className="btn btn-sm btn-primary-light text-lowercase font-weight-500 shine">
                                <i className="fa fa-chevron-right fa-fw"></i> Check out how to use search modifiers
                            </a>
                        </Link>
                    </>
                }
                className="background-circuits"
                tags={[
                    {
                        icon: <i className="fa fa-search fa-fw"></i>,
                        color: 'primary',
                        display: 'Powerful Search'
                    },
                    {
                        icon: <i className="fa fa-book fa-fw"></i>,
                        color: 'primary',
                        display: 'Practical Course Information'
                    },
                    {
                        icon: <i className="fa fa fa-quote-right fa-fw"></i>,
                        color: 'primary',
                        display: 'RateMyProfessors Integration'
                    }
                ]}
            />

            <FeatureSection
                flip
                title="Buildings"
                glyph="/glyphs/building.svg"
                alt="Courses Glyph"
                className="background-circuits"
                description="See the rooms in which your classes are located, and (if the data exists) detailed info about the rooms such as 360° Views, A/C, what kind of seats it has, and more."
                tags={[
                    {
                        icon: <i className="fa fa-grip-horizontal fa-fw"></i>,
                        color: 'primary-light',
                        display: 'Building Details'
                    },
                    {
                        icon: <i className="fa fa-map-marked-alt fa-fw"></i>,
                        color: 'primary-light',
                        display: 'Open with Google Maps'
                    },
                    {
                        icon: <i className="fa fa-clone fa-fw"></i>,
                        color: 'primary-light',
                        display: 'Detailed Room Previews'
                    }
                ]}
            />
            
            <DevElement>
                <FeatureSection
                    title="Transportation"
                    glyph="/glyphs/transport.svg"
                    alt="Transportation Glyph"
                    className="background-circuits"
                    description={
                        <>
                            <b>Coming Soon</b><br/>
                            Explore bus routes, parking lots & passes, and a lot more straight from Cobalt.
                        </>
                    }
                    tags={[
                        {
                            icon: <i className="fa fa-bus-alt fa-fw"></i>,
                            color: 'warp',
                            display: 'Bus Routes & Live Feed'
                        },
                        {
                            icon: <i className="fa fa-parking fa-fw"></i>,
                            color: 'warp',
                            display: 'Parking Lots'
                        },
                        {
                            icon: <i className="fa fa-tag fa-fw"></i>,
                            color: 'warp',
                            display: 'Parking Permits'
                        }
                    ]}
                />
            </DevElement>

            <DevElement>
                <FeatureSection
                    flip
                    title="Snapshots"
                    glyph="/glyphs/snapshot.svg"
                    alt="Snapshot Glyph"
                    className="background-circuits"
                    description={
                        <>
                            <b>Coming Soon</b><br/>
                            Visually explore course information from previous years using ILEFA's <a href="https://github.com/ilefa/snapshots" className={`text-light ${styles.sectionLink} shine`}>snapshot dataset</a> (starting 2022).
                        </>
                    }
                    tags={[
                        {
                            icon: <i className="fa fa-file-download fa-fw"></i>,
                            color: 'info',
                            display: 'Semester-by-Semester Complete Snapshots'
                        },
                        {
                            icon: <i className="fa fa-user-graduate fa-fw"></i>,
                            color: 'info',
                            display: 'Professor Ratings Progression'
                        },
                        {
                            icon: <i className="fa fa-chart-line fa-fw"></i>,
                            color: 'info',
                            display: 'Course Registration Metrics'
                        }
                    ]}
                />
            </DevElement>
            
            <Footer className="background-circuits" white />
        </div>
    </main>
);

export default HomePage;
