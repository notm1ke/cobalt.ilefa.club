import React from 'react';
import moment from 'moment';
import Head from 'next/head';

import styles from '../components/styling/internal.module.css';
import globalStyles from '../components/styling/home.module.css';

import { useStatus } from '../hooks';
import { DevPage } from '../components';
import { UncontrolledTooltip } from 'reactstrap';
import { UConnServiceStatus } from '@ilefa/husky';
import { CustomUConnServiceReport, getLatestTimeValue } from '../util';
import { Footer, GitButton, Nav, StatusCard, StatusRibbon } from '../components';

interface LinkProps {
    display: string | JSX.Element;
    href: string;
    classes?: string;
    newTab?: boolean;
}

const UnderlinedLink: React.FC<LinkProps> = ({ display, href, classes, newTab }) =>
    <a
        href={href}
        className={`text-light ${styles.internalLink} shine ${classes}`}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}>
            {display}
    </a>;

const getStatusString = (reports: CustomUConnServiceReport[]) => {
    if (isStatusLevel(reports, UConnServiceStatus.OUTAGE))
        return <span>{concatServices(reports, UConnServiceStatus.OUTAGE)} {isAre(getServicesWith(reports, UConnServiceStatus.OUTAGE))} currently experiencing an outage.</span>;

    if (isStatusLevel(reports, UConnServiceStatus.DEGRADED))
        return <span>{concatServices(reports, UConnServiceStatus.DEGRADED)} {isAre(getServicesWith(reports, UConnServiceStatus.DEGRADED))} currently experiencing degraded performance.</span>;
        
    if (isStatusLevel(reports, UConnServiceStatus.REPORTING))
        return <span>{concatServices(reports, UConnServiceStatus.REPORTING)} {isAre(getServicesWith(reports, UConnServiceStatus.REPORTING))} monitoring their status after an incident.</span>;
        
    if (reports.every(report => report.status === UConnServiceStatus.OPERATIONAL))
        return <div>
            <span>
                All upstream services are operational as of{" "}
                <span className={`text-light ${styles.internalLink} shine`} id="tooltip-last-checked">{moment(reports[0].time).fromNow()}</span>.
            </span>
            <UncontrolledTooltip delay={0} target="tooltip-last-checked" placement="top">
                {moment(reports[0].time).format('MMM Do, h:mm:ss A')}
            </UncontrolledTooltip>
        </div>;
}

const isStatusLevel = (reports: CustomUConnServiceReport[], level: UConnServiceStatus) => {
    if (level === UConnServiceStatus.OPERATIONAL)
        return reports.every(report => report.status === level);
    return reports.some(report => report.status === level);
}

const getServicesWith = (reports: CustomUConnServiceReport[], level: UConnServiceStatus) =>
    reports.filter(report => report.status === level);

const isAre = (reports: CustomUConnServiceReport[]) =>
    reports.length === 1 ? 'is' : 'are';

const concatServices = (reports: CustomUConnServiceReport[], level: UConnServiceStatus) => {
    let names = reports.filter(report => report.status === level).map(report => report.service);
    return names.length === 1
        ? <b>{names[0]}</b>
        : <><b>{names.slice(0, names.length - 1).join(', ')}</b> and <b>{names.slice(names.length - 1)}</b></>
}

const InternalHome = () => {
    const [status, loading, error] = useStatus(true);

    return (
        <DevPage>
            <main>
                <Head>
                    <title>Cobalt » Service Information</title>
                </Head>
                <Nav/>
                <div className="position-relative background-gradient">
                    <div className="section section-hero section-shaped background-circuits">
                        <div className="shape shape-style-3 shape-default"></div>
                        <div className={globalStyles.pageHeader}>
                            <StatusRibbon
                                track={['catalog', 'phonebook']}
                                ignore={[UConnServiceStatus.UNKNOWN]}
                                className="mt-5 mb--5 ml-md-5 mr-md-5"
                                dismissible />
                            <div className="container shape-container d-flex align-items-center py-lg">
                                <div className="col px-0">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-lg-6 text-center">
                                            <h1 className={`${globalStyles.nameTitle} text-white display-1`}>Cobalt</h1>
                                            <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                                Internal Service Information
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className={`section ${styles.internalSection} background-circuits`}>
                        <div className="container" id="body">
                            <h4 className={`text-white ${styles.internalSectionTitle} mb-6`}>
                                <i className="fa fa-laptop-code fa-fw"></i> Instance Overview
                                <br/><span className={`text-white ${styles.internalSectionBody}`}>
                                    This instance of Cobalt is running version <b>{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'no_git_id'} ({process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'})</b> on <b>{process.env.NEXT_PUBLIC_VERCEL_URL ? 'Vercel' : process.env.NEXT_PUBLIC_DEVICE ?? 'unknown'}</b>.
                                    <ul className={`mt-3 no-li-decoration ${styles.internalInfo}`}>
                                        <li><i className="fab fa-github fa-fw"></i> <b>Repository:</b> <UnderlinedLink display="@ilefa/websites ➔ cobalt" href="https://github.com/notm1ke/cobalt.ilefa.club" newTab /></li>
                                        <li><i className="fa fa-clock fa-fw"></i> <b>Uptime:</b> {process.env.NEXT_PUBLIC_START ? getLatestTimeValue((Date.now() - parseInt(process.env.NEXT_PUBLIC_START || '0') * 1000)) : 'unknown'}</li>
                                        <li><i className="fa fa-code-branch fa-fw"></i> <b>Release Channel:</b> {process.env.NEXT_PUBLIC_VERCEL_RELEASE_CHANNEL || 'unknown'}</li>
                                        <li><i className="fa fa-comment-alt fa-fw"></i> <b>Commit Message:</b> {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE || 'unknown'}</li>
                                    </ul>
                                    <GitButton owner="ilefa" repo="husky" />
                                    <GitButton owner="ilefa" repo="bluepages" />
                                    <GitButton owner="vercel" repo="next.js" />
                                </span>
                            </h4>
                            
                            <h4 className={`text-white ${styles.internalSectionTitle} mb-7`}>
                                <i className="fa fa-upload fa-fw"></i> Upstream Status
                                <br/><span className={`text-white ${styles.internalSectionBody}`}>
                                    {status && getStatusString(status)}
                                </span>
                                <span className={`text-white ${styles.internalSectionBody}`}>
                                    {
                                        loading && (
                                            <span className={`text-white ${styles.infoSectionTitle}`}>
                                                <i className="fa fa-spinner fa-spin fa-fw"></i> Loading..
                                            </span>
                                        )
                                    }
                                    {
                                        error && (
                                            <span className={`text-white ${styles.infoSectionTitle}`}>
                                                <i className="fa fa-times-circle fa-fw"></i> An error occurred while fetching upstream statuses.
                                            </span>
                                        )
                                    }
                                    {
                                        status && (
                                            <div className="row">
                                                {
                                                    status && status
                                                        .sort((a, b) => a.service.localeCompare(b.service))
                                                        .map(report => (
                                                            <div className="col-md-4" key={report.service}>
                                                                <StatusCard report={report} key={report.service} />
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        )
                                    }
                                </span>
                            </h4>
                        </div>
                    </section>
                    <Footer className="background-circuits" white />
                </div>
            </main>
        </DevPage>
    );
}

export default InternalHome;
