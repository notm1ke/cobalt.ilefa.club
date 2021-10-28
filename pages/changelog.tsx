import React from 'react';
import Head from 'next/head';

import styles from '../components/styling/info.module.css';
import globalStyles from '../components/styling/home.module.css';
import previewStyles from '../components/styling/preview.module.css';

import { Footer, InlineLink, Nav, PreviewPage } from '../components';
import { isPreview } from '../util';

const CHANGELOG = [
    "Introduced dorms integration (with special thanks to the r/UConnDorms team)",
    "Introduced dining halls integration", 
    "Added section identifier to SectionsTab extra info (since mobile browser likes to cut it off in the table-view)",
    "Added new hooks and API routes for dorms & dining halls services",
    "Added new standard buttons (i.e. ContributorButton)",
    "Added honors warning to OverviewTab + ExpandedSectionsTab + Search",
    "Added room icons to SectionsTab",
    "Added new preview changelogs",
    "Added new preview utility components, much like dev components",
    "Added more in-depth inline metrics viewer",
    "Split massive utility file into multiple different files under the util folder",
    "Fixed mobile browser zooming in when clicking input fields",
    "Fixed some broken mobile responsiveness / styling",
    "Fixed navigation dropdowns looking weird on mobile (now forced to switch to non-icon view)"
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
                                            Cobalt {isPreview() ? 'Preview' : 'Development'} {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'no_git_id'}
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
                                    CHANGELOG.map(ent => (
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
                                This preview of Cobalt is running version <b>{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'no_git_id'}</b> on <b>{process.env.NEXT_PUBLIC_VERCEL_URL ? 'Vercel' : process.env.NEXT_PUBLIC_DEVICE ?? 'unknown'}</b>.
                                <ul className={`mt-3 no-li-decoration ${styles.internalInfo}`}>
                                    <li><i className="fab fa-github fa-fw"></i> <b>Source:</b> <InlineLink display="@ilefa/websites ➔ cobalt" href="https://github.com/notm1ke/cobalt.ilefa.club" newTab /></li>
                                    <li><i className="fa fa-code-branch fa-fw"></i> <b>Release Channel:</b> {process.env.NEXT_PUBLIC_VERCEL_RELEASE_CHANNEL || 'unknown'}</li>
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
