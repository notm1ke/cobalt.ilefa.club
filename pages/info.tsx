import React from 'react';
import Head from 'next/head';

import styles from '../components/styling/info.module.css';
import globalStyles from '../components/styling/home.module.css';

import { ContentAreaNames } from '../util';
import { Footer, Nav } from '../components';
import { UncontrolledTooltip } from 'reactstrap';

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
    
]

const InfoPage = () => {
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
                                Husky works by scraping the <a href="https://catalog.uconn.edu" className={`text-light ${styles.infoLink} shine`} target="_blank" rel="noopener noreferrer">course catalog</a> to compile the relevant information about courses.
                                For more information, see the linked GitHub repository below.
                                <br/>
                                <a href="https://github.com/ilefa/husky" target="_blank" rel="noopener noreferrer" className="btn btn-dark bg-ilefa-dark shine btn-icon mt-3 mb-sm-0 text-lowercase">
                                    <span className="btn-inner--icon"><i className="fab fa-github"></i></span>
                                    <span className="btn-inner--text">@ilefa/husky</span>
                                </a>
                            </span>
                        </h4>
                        
                        <h4 className={`text-white ${styles.infoSectionTitle} mb-7`}>
                            <i className="fa fa-sort-alpha-up fa-fw"></i> Search modifiers
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
                        
                        <h4 className={`text-white ${styles.infoSectionTitle}`}>
                            <i className="fa fa-balance-scale-left fa-fw"></i> Affiliations
                            <br/><span className={`text-white ${styles.infoSectionBody}`}>
                                Neither ILEFA Labs, nor Cobalt are affiliated with, or endorsed by the <a href="https://uconn.edu" className={`text-light ${styles.infoLink} shine`}>University of Connecticut</a>.
                                <br/>Learn more about ILEFA over on <a href="https://ilefa.club" className={`text-light ${styles.infoLink} shine`} target="_blank" rel="noopener noreferrer">our website</a>.
                            </span>
                        </h4>
                    </div>
                </section>
                <Footer white={true} />
            </div>
        </main>
    );
}

export default InfoPage;
