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
import previewStyles from '../components/styling/preview.module.css';

import { isPreview } from '../util';
import { Footer, InlineLink, Nav, PreviewPage } from '../components';
import { COMMIT_HASH, INSTANCE_HOST, RELEASE_CHANNEL } from '../util/build';

const CHANGELOG = [
    "Expanded capabilities and adaptability of the course viewer",
    "Greatly improved CobaltSearch performance by using server-side query processing",
    "Greatly improved course endpoint responsiveness by removing per-section enrollment fetch",
    "DiningHallCard now shows as \"closed\" if no menu items are available",
    "DiningHallCard schedule / menu timezone fixes",
    "Added support for graduate courses",
    "Added warning for courses not currently being offered",
    "Added \"all food\" button to dining page",
    "Added food favorites to dining page",
    "Added room schedules to the room inspection UI",
    "Added realtime room status to the room inspection UI",
    "Added the \"I'm feeling silly\" button to CobaltSearch",
    "Added full support for summer courses w/ Session Indicators",
    "Added summer sections notice in OverviewTab",
    "Added Bluetrade integration to add course equivalency data",
    "Added Bluefit integration to add rec center realtime traffic data",
    "Updated UI to have a wider renderable space to allow more viewable content",
    "Updated dining hall hours to reflect new Spring 2022 hours",
    "Updated dorms payload target",
    "Updated the way section locations are handled using the new SectionLocationData system",
    "Updated the buildings page and split it into buildings (/buildings) and rooms (/buildings/:building)",
    "[In Progress] Added Cobalt Maps, and currently expanding functionality",
    "[Planned] CMD + K command pallette",
    "[Planned] Global search shortcut in navbar",
]

const ChangelogPage = () => (
    <PreviewPage allowDev>
        <main>
            <Head>
                <title>Cobalt » Preview Changelog</title>
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
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>Changelog</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            Cobalt {isPreview() ? 'Preview' : 'Development'} {COMMIT_HASH?.substring(0, 7) || 'no_git_id'}
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
                            <i className="fa fa-stream fa-fw mb-3"></i> Changes in this Preview
                            <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                {
                                    CHANGELOG.length === 0 && (
                                        <>There are no listed changes for this deployment.</>
                                    )
                                }
                                {
                                    CHANGELOG.length !== 0 && CHANGELOG.map(ent => (
                                        <li key={Math.random()} className={previewStyles.changelogItem}>
                                            - {ent}
                                        </li>
                                    ))
                                }
                                <br/>
                            </span>
                        </h4>

                        <h4 className={`text-white ${styles.infoSectionTitle} mb-2`}>
                            <i className="fa fa-laptop-code fa-fw"></i> Preview Information
                            <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                This preview of Cobalt is running version <b>{COMMIT_HASH?.substring(0, 7) || 'no_git_id'}</b> on <b>{process.env.NEXT_PUBLIC_VERCEL_URL ? 'Vercel' : INSTANCE_HOST ?? 'unknown'}</b>.
                                <ul className={`mt-3 no-li-decoration ${styles.internalInfo}`}>
                                    <li><i className="fab fa-github fa-fw"></i> <b>Source:</b> <InlineLink display="@ilefa/websites ➔ cobalt" href="https://github.com/notm1ke/cobalt.ilefa.club" newTab /></li>
                                    <li><i className="fa fa-code-branch fa-fw"></i> <b>Release Channel:</b> {RELEASE_CHANNEL || 'unknown'}</li>
                                </ul>                               
                                <br/>
                            </span>
                        </h4>
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    </PreviewPage>
);

export default ChangelogPage;
