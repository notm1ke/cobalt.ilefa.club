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

import { useToggle } from '../hooks';
import { CopyButton, Footer, Nav, PreviewPage } from '../components';

const PreviewGuidelinesPage = () => {
    const [state1, toggle1] = useToggle();
    const [state2, toggle2] = useToggle();

    return (
        <PreviewPage>
            <main>
                <Head>
                    <title>Cobalt » Preview Guidelines</title>
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
                                                Unreleased Feature Preview Guidelines
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
                                <i className="fa fa-file-invoice fa-fw"></i> Preamble
                                <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                    Please review and try to adhere to the following set of guidelines. This will help us maintain and continue to improve unreleased Cobalt features.
                                    <br/>
                                </span>
                            </h4>
                            
                            <h4 className={`text-white ${styles.infoSectionTitle} mb-7`} id="search-modifiers">
                                <i className="fa fa-bug fa-fw"></i> Bug Reporting
                                <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                    As with any unreleased piece of software, bugs will likely exist - whether we know it or not. Please be diligent in reporting any bugs you find,
                                    as this will help us roll out features quicker, and maintain the standard of user-experience you expect.
                                    <br/><br/>
                                    If you come across a bug, please message {""}
                                    <CopyButton
                                        contentToCopy='MiKe#0001'
                                        cooldown={1000}
                                        onCopied={toggle1}
                                        onCopyRecharged={toggle1}
                                        className={`text-light ${styles.infoLink} shine  ${state1 ? 'pointer-disabled' : 'pointer'}`}>
                                            MiKe#0001
                                        </CopyButton> on Discord with information about where the bug can be found, how to reproduce it, and any other relevant information.
                                    Please be as specific as possible, and include screenshots and/or console logs if applicable.
                                </span>
                            </h4>
    
                            <h4 className={`text-white ${styles.infoSectionTitle} mb-7`} id="search-modifiers">
                                <i className="fa fa-bell fa-fw"></i> Responsible Disclosure
                                <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                    Due to the nature of the service we provide - finding vulnerabilities is improbable.
                                    However, in the event that a vulnerability regarding any part of Cobalt is discovered, please be diligent and disclose it to {""}
                                    <CopyButton
                                        contentToCopy='MiKe#0001'
                                        cooldown={1000}
                                        onCopied={toggle2}
                                        onCopyRecharged={toggle2}
                                        className={`text-light ${styles.infoLink} shine ${state2 ? 'pointer-disabled' : 'pointer'}`}>
                                            MiKe#0001
                                    </CopyButton> so it can be addressed.
                                </span>
                            </h4>
                        </div>
                    </section>
                    <Footer className="background-circuits" white />
                </div>
            </main>
        </PreviewPage>
    )
}

export default PreviewGuidelinesPage;
