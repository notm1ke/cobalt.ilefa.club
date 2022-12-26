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
import Head from 'next/head';

import styles from '../components/styling/info.module.css';
import globalStyles from '../components/styling/home.module.css';

import { useSnapshotRecords, useStatistics } from '../hooks';
import { ContentAreaNames } from '../util';
import { UncontrolledTooltip } from 'reactstrap';

import {
    Footer,
    GitButton,
    IconCardXl,
    InlineLink,
    Nav,
    StatisticSection
} from '../components';

const modifiers = [
    {
        name: 'ca1',
        tooltip: <>
                    <b>Content Area 1</b>
                    <br/>{ContentAreaNames.CA1}
                </>
    },
    {
        name: 'ca2',
        tooltip: <>
                    <b>Content Area 2</b>
                    <br/>{ContentAreaNames.CA2}
                </>
    },
    {
        name: 'ca3',
        tooltip: <>
                    <b>Content Area 3</b>
                    <br/>{ContentAreaNames.CA3}
                </>
    },
    {
        name: 'ca4',
        tooltip: <>
                    <b>Content Area 4</b>
                    <br/>{ContentAreaNames.CA4}
                </>
    },
    {
        name: 'ca4int',
        tooltip: <>
                    <b>Content Area 4 (International)</b>
                    <br/>{ContentAreaNames.CA4INT}
                </>    
    },
    {
        name: 'lab',
        tooltip: <>
                    <b>Competency</b>
                    <br/>Laboratory (L)
                </>
    },
    {
        name: 'w',
        tooltip: <>
                    <b>Competency</b>
                    <br/>Writing (W)
                </>
    },
    {
        name: 'q',
        tooltip: <>
                    <b>Competency</b>
                    <br/>Quantitative (Q)
                </>
    },
    {
        name: 'e',
        tooltip: <>
                    <b>Competency</b>
                    <br/>Environmental Literacy (E)
                </>
    },
    {
        name: 'g',
        tooltip: <>
                    <b>Course Level</b>
                    <br/>Graduate Courses
                </>
    },
    {
        name: 'ug',
        tooltip: <>
                    <b>Course Level</b>
                    <br/>Undergraduate Courses
                </>
    }
];

const statMarkers = [
    {
        name: 'Courses',
        icon: <i className="fa fa-book fa-fw"></i>,
        iconColor: 'primary',
        loading: true,
        countUp: true,
    },
    {
        name: 'Professors',
        icon: <i className="fa fa-user-graduate fa-fw"></i>,
        iconColor: 'primary',
        loading: true,
        countUp: true,
    },
    {
        name: 'Classrooms',
        icon: <i className="fa fa-chalkboard-teacher fa-fw"></i>,
        iconColor: 'primary',
        loading: true,
        countUp: true,
        key: 'rooms',
    },
    {
        name: 'Buildings',
        icon: <i className="fa fa-building fa-fw"></i>,
        iconColor: 'primary',
        loading: true,
        countUp: true,
    },
    {
        name: 'Assets',
        icon: <i className="fa fa-file-invoice fa-fw"></i>,
        iconColor: 'primary',
        loading: true,
        countUp: true,
    },
];

const InfoPage = () => {
    const [stats, loading, error] = useStatistics('full');
    const [records, _loading, _error] = useSnapshotRecords();

    return (
        <main>
            <Head>
                <title>Cobalt » Information</title>
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
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>Cobalt</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            An ILEFA project, for all UConn students.
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.infoSection} background-circuits`}>
                    <div className="container" id="body">
                        <h4 className={`text-white ${styles.infoSectionTitle} mb-7`}>
                            <i className="fa fa-file-import fa-fw"></i> Where our data comes from
                            <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                Since UConn does not publicly expose an API of any sorts to retrieve course data, we built an npm package called Husky that allows anyone to query this information.
                                Husky works by scraping the <InlineLink display="course catalog" href="https://catalog.uconn.edu" newTab /> to compile the relevant information about courses.
                                For more information, see the linked GitHub repository below.
                                <br/>
                                <GitButton owner="ilefa" repo="husky" />
                            </span>
                        </h4>
                        
                        <h4 className={`text-white ${styles.infoSectionTitle} mb-7`} id="search-modifiers">
                            <i className="fa fa-sort-alpha-up fa-fw"></i> Search Modifiers
                            <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                A search modifier is a term that is prepended with a plus sign - they may be chained together, and may be used as an entire search query by themselves; for example, just typing in <code className={styles.inlineModifier}>+w</code> will list every course that is marked as having a writing competency.
                                Likewise, you can chain them together, so typing in <code className={styles.inlineModifier}>+ca1 +ca4</code> will list every course that covers both Content Areas 1 and 4. Additionally, you can use a keyword and modifier together to get even more accurate results.
                                For example, typing <code className={styles.inlineModifier}>anth +ca2 +ca4</code> will list every single course under ANTH, and then filter the results out to only contain Content Area 2 and 4.
                                <br/><br/>The following terms are valid search modifiers - hover over any of them to see what they do.
                                <br/>
                                {
                                    modifiers.map(modifier => (
                                        <span className={styles.modifier}>
                                            <code key={modifier.name} id={`tooltip-${modifier.name}`}>{modifier.name}</code>{" "}
                                            <UncontrolledTooltip delay={0} placement="top" target={`tooltip-${modifier.name}`}>
                                                {modifier.tooltip}
                                            </UncontrolledTooltip>
                                        </span>
                                    ))
                                }
                            </span>
                        </h4>

                        <h4 className={`text-white ${styles.infoSectionTitle} mb-7`}>
                            <i className="fa fa-chart-bar fa-fw"></i> The Numbers
                            <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                It's no secret that Cobalt handles a lot of data while serving requests - so we thought it would be cool to pair this data with our <InlineLink display="snapshot dataset" href="https://github.com/ilefa/snapshots" newTab /> in order to visualize this data semester-by-semester.
                                {
                                    error && (
                                        <IconCardXl headerText="Whoops" headerColor="text-danger" iconColor="bg-danger">
                                            <span className="text-dark">
                                                Hmm, an error occurred while retrieving statistics data from the web.
                                                <br/>If this error continues to persist, please notify an ILEFA member.
                                            </span>
                                        </IconCardXl>
                                    )
                                }

                                {
                                    loading && (
                                        <StatisticSection
                                            className="background-circuits"
                                            section={false}
                                            statistics={
                                                statMarkers.map(marker => ({ ...marker, amount: NaN }))
                                            }
                                        />
                                    )
                                }

                                {
                                    stats && records && (
                                        <StatisticSection
                                            className="background-circuits"
                                            section={false}
                                            statistics={
                                                statMarkers.map(marker => ({
                                                    ...marker,
                                                    amount: stats[marker.key ?? marker.name.toLowerCase()],
                                                    loading: false,
                                                    change: !['buildings', 'assets'].includes(marker.name.toLowerCase())
                                                        ? stats![marker.key ?? marker.name.toLowerCase()] - records[marker.name.toLowerCase()]
                                                        : 0                                               
                                                }))
                                            }
                                        />
                                    )
                                }
                            </span>
                        </h4>

                        <h4 className={`text-white ${styles.infoSectionTitle}`}>
                            <i className="fa fa-balance-scale-left fa-fw"></i> Affiliations
                            <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                Neither ILEFA Labs, nor Cobalt are affiliated with, or endorsed by the <a href="https://uconn.edu" className={`text-light ${styles.infoLink} shine`}>University of Connecticut</a>.
                                <br/>Learn more about ILEFA over on <a href="https://ilefa.club" className={`text-light ${styles.infoLink} shine`} target="_blank" rel="noopener noreferrer">our website</a>.
                            </span>
                        </h4>
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default InfoPage;
