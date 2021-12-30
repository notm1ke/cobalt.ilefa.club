import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../components/styling/home.module.css';

import { mdiFlask } from '@mdi/js';
import { isMobile } from 'react-device-detect';
import { UConnServiceStatus } from '@ilefa/husky';

import {
    getCurrentSemester,
    intToWords,
    isDevelopment,
    isPreview
} from '../util';

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
    let rawDays = moment('2021-12-17').diff(moment(), 'days');
    let days = (rawDays - 7) + 1;
    let isBreak = days <= 0;
    let isFinals = rawDays > 0 && isBreak;
    
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
                                        <CobaltSearch feelingSilly={isDevelopment() || isPreview()} />
                                        <small className="text-secondary">
                                            <i className={'fa ' + (isBreak && !isFinals ? 'fa-smile text-success' : isFinals ? 'fas fa-flushed text-orange' : 'fa-clock text-orange') + ' fa-fw mr-1'}></i>
                                            <i>
                                                {
                                                    isBreak && !isFinals
                                                        ? 'The semester is over, enjoy your well deserved break!'
                                                        : isFinals
                                                            ? 'Good luck on your finals - you\'ll do great!'
                                                            : `There are ${intToWords(days)} school day${days === 1 ? '' : 's'} left in the ${getCurrentSemester()} semester.`
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
    
                <DevElement>
                    <FeatureSection
                        title="Maps"
                        flip
                        glyph="/glyphs/maps.svg"
                        alt="Maps Glyph"
                        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo eum reiciendis, alias ullam deserunt accusamus ipsam quo. Sequi modi voluptate molestiae, doloremque dicta assumenda incidunt animi, voluptas, at sunt enim?"
                        className="background-circuits"
                        tags={[
                            {
                                icon: <i className="fa fa-map-pin fa-fw"></i>,
                                color: 'primary',
                                display: 'Points of Interest'
                            },
                            {
                                icon: <i className="fa fa-building fa-fw"></i>,
                                color: 'primary',
                                display: 'Building Directories & Room Schedules'
                            },
                            {
                                icon: <i className="fas fa-graduation-cap fa-fw"></i>,
                                color: 'primary',
                                display: 'Powerful Course Integration'
                            }
                        ]}
                    />
                </DevElement>
    
                <FeatureSection
                    title="Buildings"
                    flip
                    glyph="/glyphs/building.svg"
                    alt="Buildings Glyph"
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
                            display: 'Room Schedules'
                        }
                    ]}
                />

                <FeatureSection
                    title="Dorms"
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
                    flip
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
}

export default HomePage;
