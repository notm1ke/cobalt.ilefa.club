import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../components/styling/home.module.css';

import { mdiFlask } from '@mdi/js';
import { isMobile } from 'react-device-detect';
import { UConnServiceStatus } from '@ilefa/husky';
import { capitalizeFirst, getCurrentSemester, intToWords } from '../util';

import {
    CobaltSearch,
    DevElement,
    FeatureSection,
    Footer,
    Nav,
    OneTimeView,
    PreviewRibbon,
    StatusRibbon
} from '../components';

const HomePage = () => {
    let rawDays = moment('2022-05-7').diff(moment(), 'days');
    let semOver = rawDays <= 0;
    
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
                        <DevElement allowStaging>
                            <OneTimeView target="previewRibbon">
                                <PreviewRibbon 
                                    mdiIcon
                                    icon={mdiFlask}
                                    content={
                                        <>
                                            Welcome to the nightly preview version of <b>Cobalt</b>, this version has many unreleased and (mostly) stable features over the current stable version — please report any bugs you may find!
                                        </>
                                    } />
                            </OneTimeView>
                        </DevElement>
                        <div className={`container shape-container d-flex align-items-center py-lg ${isMobile ? styles.headerHeightMobile : styles.headerHeight}`}>
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${styles.nameTitle} text-white display-1`}>Cobalt</h1>
                                        <h2 className={`${styles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            An intelligent suite of tools built by UConn students, for UConn students.
                                        </h2>
                                        <CobaltSearch feelingSilly />
                                        <small className="text-secondary">
                                            <i className={'fa ' + (semOver ? 'fa-clock text-success' : 'fas fa-chalkboard-teacher text-warning') + ' fa-fw mr-1'}></i>
                                            <i>
                                                {
                                                    semOver
                                                        ? `The ${getCurrentSemester().split(/\d{4}/)[0]} semester has ended, enjoy your break!`
                                                        : `There are ${intToWords(rawDays)} day${rawDays === 1 ? '' : 's'} left until the ${capitalizeFirst(getCurrentSemester())} semester ends.`
                                                }
                                            </i>
                                        </small>
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
                            Easily search for your courses and find detailed information about what <b>content areas</b> and <b>competencies</b> they fulfill, which <b>sections</b> are running, and how good the <b>professors</b> are all in one place.
                            <br /><br /><Link href="/info#search-modifiers">
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
                            color: 'primary-light',
                            display: 'Powerful Search'
                        },
                        {
                            icon: <i className="fa fa-book fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Practical Course Information'
                        },
                        {
                            icon: <i className="fa fa fa-quote-right fa-fw"></i>,
                            color: 'primary-light',
                            display: 'RateMyProfessors Integration'
                        }
                    ]}
                />
    
                <FeatureSection
                    title="Maps"
                    flip
                    glyph="/glyphs/maps.svg"
                    alt="Maps Glyph"
                    description={
                        <>
                            <div className="mt--3 mb--2">
                                <span className={styles.comingSoonFeature}>Coming Soon</span>
                            </div>
                            <br/>Explore the Storrs Campus and view rich information about buildings and the <b>rooms that are available</b> in them, dining halls and <b>what they're serving</b>, residential buildings and the <b>quality of their dorms</b>, and other points of interest.
                        </>
                    }
                    className="background-circuits"
                    tags={[
                        {
                            icon: <i className="fa fa-map-marker-alt fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Points of Interest'
                        },
                        {
                            icon: <i className="fa fa-building fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Building Directories & Room Schedules'
                        },
                        {
                            icon: <i className="fa fa-utensils fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Dining Hall Menus'
                        }
                    ]}
                />
    
                <FeatureSection
                    title="Buildings"
                    glyph="/glyphs/building.svg"
                    alt="Buildings Glyph"
                    className="background-circuits"
                    description="See the rooms in which your classes are located, and (if the data exists) detailed info about the rooms such as 360° Views, A/C, what kind of seats they have, and their schedules."
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
                            display: 'Room Schedules'
                        }
                    ]}
                />

                <FeatureSection
                    title="Dorms"
                    flip
                    glyph="/glyphs/dorms.svg"
                    alt="Dorms Glyph"
                    className="background-circuits"
                    description="Moving in? Check out what your dorm might look like by looking at other people's images and videos. Also, check out what amenities exist in your residence hall, and what other people think of living there."
                    tags={[
                        {
                            icon: <i className="fa fa-photo-video fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Real Dorm Images'
                        },
                        {
                            icon: <i className="fa fa-star fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Residence Hall Ratings'
                        },
                        {
                            icon: <i className="fa fa-check-circle fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Amenities & Information'
                        }
                    ]}
                />
    
                <FeatureSection
                    title="Dining Halls"
                    glyph="/glyphs/dining.svg"
                    alt="Dining Glyph"
                    className="background-circuits"
                    description="Hungry? Check out what each of the Dining Halls in Storrs are serving, and their current statuses."
                    tags={[
                        {
                            icon: <i className="fa fa-utensils fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Dining Hall Menus'
                        },
                        {
                            icon: <i className="fa fa-business-time fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Realtime Status'
                        },
                        {
                            icon: <i className="fa fa-clone fa-fw"></i>,
                            color: 'primary-light',
                            display: 'Detailed Information'
                        }
                    ]}
                />

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
                                color: 'primary-light',
                                display: 'Semester-by-Semester Complete Snapshots'
                            },
                            {
                                icon: <i className="fa fa-user-graduate fa-fw"></i>,
                                color: 'primary-light',
                                display: 'Professor Ratings Progression'
                            },
                            {
                                icon: <i className="fa fa-chart-line fa-fw"></i>,
                                color: 'primary-light',
                                display: 'Course Registration Metrics'
                            }
                        ]}
                    />
                </DevElement>
                
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default HomePage;
