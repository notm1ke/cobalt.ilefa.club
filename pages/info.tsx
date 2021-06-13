import React from 'react';

import styles from '../components/styling/info.module.css';
import globalStyles from '../components/styling/home.module.css';

import { Footer, Nav } from '../components';

const InfoPage = () => {
    return (
        <main>
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
                                Husky works by scraping the <a href="https://catalog.uconn.edu" className={`text-light ${styles.infoLink} shine`} target="_blank" rel="noopener noreferrer">course catalog</a> to compile the relevent information about courses.
                                For more information, see the linked GitHub repository below.
                                <br/>
                                <a href="https://github.com/ilefa/husky" target="_blank" rel="noopener noreferrer" className="btn btn-dark bg-ilefa-dark shine btn-icon mt-3 mb-sm-0 text-lowercase">
                                    <span className="btn-inner--icon"><i className="fab fa-github"></i></span>
                                    <span className="btn-inner--text">@ilefa/husky</span>
                                </a>
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
