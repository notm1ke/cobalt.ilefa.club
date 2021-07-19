import React from 'react';
import styles from '../components/styling/home.module.css';

import {
    CobaltSearch,
    FeatureSection,
    Footer,
    Nav
} from '../components';

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
                <FeatureSection
                    title="Courses"
                    glyph="/course.svg"
                    alt="Courses Glyph"
                    description="Easily search for your courses and find detailed information about what <b>content areas</b> and <b>competencies</b> they fulfill, which <b>sections</b> are running, and how good the <b>professors</b> are all in one place."
                    className="mt-5"
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
                            display: 'RateMyProfessor Integration'
                        }
                    ]}
                />

                <FeatureSection
                    flip
                    title="Buildings"
                    glyph="/building.svg"
                    alt="Courses Glyph"
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
                            display: 'Open in Google Maps'
                        },
                        {
                            icon: <i className="fa fa-clone fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Detailed Room Previews'
                        }
                    ]}
                />
                
                <FeatureSection
                    title="Transportation"
                    glyph="/transport.svg"
                    alt="Transportation Glyph"
                    description="<b>Coming Soon.</b> Explore bus routes, parking lots & passes, and a lot more straight from Cobalt."
                    tags={[
                        // {
                        //     icon: <i className="fa fa-bus-alt fa-fw"></i>,
                        //     color: 'warp',
                        //     display: 'Bus Routes & Live Feed'
                        // },
                        // {
                        //     icon: <i className="fa fa-parking fa-fw"></i>,
                        //     color: 'warp',
                        //     display: 'Parking Lots'
                        // },
                        // {
                        //     icon: <i className="fa fa-tag fa-fw"></i>,
                        //     color: 'warp',
                        //     display: 'Parking Permits'
                        // }
                    ]}
                />
                    
                <Footer white={true} />
            </div>
        </main>
    );
}

export default HomePage;
