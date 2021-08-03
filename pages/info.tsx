import React from 'react';
import Head from 'next/head';

import styles from '../components/styling/info.module.css';
import globalStyles from '../components/styling/home.module.css';

import { UncontrolledTooltip } from 'reactstrap';
import { useLatestCommit, useStatistics } from '../hooks';
import { ContentAreaNames, getLatestTimeValue } from '../util';

import {
    DevElement,
    Footer,
    IconCardXl,
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

interface InfoLinkProps {
    display: string | JSX.Element;
    href: string;
    classes?: string;
    newTab?: boolean;
}

const InfoLink: React.FC<InfoLinkProps> = ({ display, href, classes, newTab }) =>
    <a
        href={href}
        className={`text-light ${styles.infoLink} shine ${classes}`}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}>
            {display}
    </a>;

const InfoPage = () => {
    const [stats, sLoading, sError] = useStatistics('full');
    const [commit, cLoading, cError] = useLatestCommit('ilefa', 'husky');

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
                                Husky works by scraping the <InfoLink display="course catalog" href="https://catalog.uconn.edu" newTab /> to compile the relevant information about courses.
                                For more information, see the linked GitHub repository below.
                                <br/>
                                <a href="https://github.com/ilefa/husky" target="_blank" rel="noopener noreferrer" className="btn btn-dark bg-ilefa-dark shine btn-icon mt-3 mb-sm-0 text-lowercase">
                                    <span className="btn-inner--icon"><i className="fab fa-github"></i></span>
                                    <span className="btn-inner--text font-weight-600">
                                        @ilefa/husky ➔ {
                                            cLoading
                                                ? <i className="fa fa-spinner fa-spin fa-fw"></i> 
                                                : cError
                                                    ? <span>no_git_id</span>
                                                    : <span>{commit!.shaShort}</span>
                                        }
                                    </span>
                                </a>
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
                                It's no secret that Cobalt handles a lot of data while serving requests - so we thought it would be cool to pair this data with our <InfoLink display="snapshot dataset" href="https://github.com/ilefa/snapshots" newTab /> in order to visualize this data semester-by-semester.
                                {
                                    sError && (
                                        <IconCardXl headerText="Whoops" headerColor="text-danger" iconColor="bg-danger">
                                            <span className="text-dark">
                                                Hmm, an error occurred while retrieving statistics data from the web.
                                                <br/>If this error continues to persist, please notify an ILEFA member.
                                            </span>
                                        </IconCardXl>
                                    )
                                }

                                {
                                    sLoading && (
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
                                    stats && (
                                        <StatisticSection
                                            className="background-circuits"
                                            section={false}
                                            statistics={
                                                statMarkers.map(marker => ({
                                                    ...marker,
                                                    amount: stats[marker.key ?? marker.name.toLowerCase()],
                                                    loading: false,
                                                    change: 0
                                                }))
                                            }
                                        />
                                    )
                                }
                            </span>
                        </h4>
                        
                        <DevElement allowStaging>
                            <h4 className={`text-white ${styles.infoSectionTitle} mb-7`}>
                                <i className="fa fa-laptop-code fa-fw"></i> Service Information
                                <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                    This instance of Cobalt is running version <b>{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'no_git_id'} ({process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'})</b> on <b>{process.env.NEXT_PUBLIC_VERCEL_URL ? 'Vercel' : process.env.NEXT_PUBLIC_DEVICE ?? 'unknown'}</b>.
                                    <ul className={`mt-3 no-li-decoration ${styles.internalInfo}`}>
                                        <li><i className="fab fa-github fa-fw"></i> <b>Repository:</b> <InfoLink display="@ilefa/websites ➔ cobalt" href="https://github.com/notm1ke/cobalt.ilefa.club" newTab /></li>
                                        <li><i className="fa fa-clock fa-fw"></i> <b>Uptime:</b> {process.env.NEXT_PUBLIC_START ? getLatestTimeValue((Date.now() - parseInt(process.env.NEXT_PUBLIC_START || '0') * 1000)) : 'unknown'}</li>
                                        <li><i className="fa fa-code-branch fa-fw"></i> <b>Release Channel:</b> {process.env.NEXT_PUBLIC_VERCEL_RELEASE_CHANNEL || 'unknown'}</li>
                                        <li><i className="fa fa-comment-alt fa-fw"></i> <b>Commit Message:</b> {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE || 'unknown'}</li>
                                    </ul>
                                </span>
                            </h4>
                        </DevElement>

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
