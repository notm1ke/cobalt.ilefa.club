/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import moment from 'moment';
import Head from 'next/head';

import styles from '../components/styling/internal.module.css';
import globalStyles from '../components/styling/home.module.css';

import { useStatus } from '../hooks';
import { DevPage, InlineLink } from '../components';
import { UncontrolledTooltip } from 'reactstrap';
import { UConnServiceStatus } from '@ilefa/husky';
import { CustomUConnServiceReport, getLatestTimeValue } from '../util';
import { Footer, GitButton, Nav, StatusCard, StatusRibbon } from '../components';

import {
    BUILT_AT,
    COMMIT_AUTHOR,
    COMMIT_HASH,
    COMMIT_MESSAGE,
    DISPLAY_VERSION,
    INSTANCE_HOST,
    RELEASE_CHANNEL
} from '../util/build';

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
                                <i className="fa fa-balance-scale-left fa-fw"></i> Preamble
                                <br/><span className={`text-white ${styles.internalSectionBody}`}>
                                    This is an internal distribution of Cobalt, and as such, is not intended for external consumption.<br/>
                                    Any unauthorized attempt to transmit or duplicate internal concepts or unreleased features is strictly prohibited, and punishable by the full extent of United States Copyright Law.
                                </span>
                            </h4>

                            <h4 className={`text-white ${styles.internalSectionTitle} mb-6`}>
                                <i className="fa fa-laptop-code fa-fw"></i> Instance Overview
                                <br/><span className={`text-white ${styles.internalSectionBody}`}>
                                    This instance of Cobalt is running version <b><InlineLink display={(COMMIT_HASH || 'no_git_id') + ` (${process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'})`} href={`https://github.com/notm1ke/cobalt.ilefa.club/commit/${COMMIT_HASH}`} newTab /></b> on <b>{process.env.NEXT_PUBLIC_VERCEL_URL ? 'Vercel' : INSTANCE_HOST ?? 'unknown'}</b>.
                                    <ul className={`mt-3 no-li-decoration ${styles.internalInfo}`}>
                                        <li><i className="fa fa-dice fa-fw"></i> <b>Version Info:</b> {DISPLAY_VERSION || 'unknown'}</li>
                                        <li><i className="fa fa-clock fa-fw"></i> <b>Uptime:</b> {BUILT_AT ? getLatestTimeValue((Date.now() - parseInt(BUILT_AT || '0') * 1000)) : 'unknown'}</li>
                                        <li><i className="fa fa-code-branch fa-fw"></i> <b>Release Channel:</b> {RELEASE_CHANNEL || 'unknown'}</li>
                                        <li><i className="fab fa-github fa-fw"></i> <b>Repository:</b> <UnderlinedLink display="@ilefa/websites ➔ cobalt" href="https://github.com/notm1ke/cobalt.ilefa.club" newTab /></li>
                                        <li><i className="fa fa-comment-alt fa-fw"></i> <b>Commit Message:</b> {COMMIT_MESSAGE || 'unknown'}</li>
                                        <li><i className="fa fa-user-astronaut fa-fw"></i> <b>Commit Author:</b> {COMMIT_AUTHOR || 'unknown'}</li>
                                    </ul>
                                    <GitButton owner="ilefa" repo="husky" />
                                    <GitButton owner="ilefa" repo="snapshots" />
                                    <GitButton owner="ilefa" repo="bluepages" />
                                    <GitButton owner="ilefa" repo="blueplate" />
                                    <GitButton owner="ilefa" repo="bluetrade" />
                                    <GitButton owner="ilefa" repo="bluefit" />
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
