import React from 'react';
import styles from '../components/styling/home.module.css';

import { CobaltSearch } from '../components/CobaltSearch';
import { Footer, IconCardGlyph, Nav } from '../components';

const HomePage = () => {
    return (
        <main>
            <Nav/>
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={styles.pageHeader}>
                        <div className="container shape-container d-flex align-items-center py-lg">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${styles.nameTitle} text-white display-1`}>Cobalt</h1>
                                        <h2 className={`${styles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            A suite of better course tools built by UConn students, for UConn students.
                                        </h2>
                                        <CobaltSearch />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section section-lg ${styles.sectionSeperator} background-circuits`}>
                    <div className="container" id="body">
                        <IconCardGlyph 
                            title="A little about us"
                            icon="fa fa-user-astronaut"
                            glyph={'/stonk.svg'}
                            className={styles.aboutUsCardFix}
                            content={
                                <p>
                                    We are ILEFA - what started as a couple of college freshman interested in the stonk market has become a strong development group focused on creating software that connects people.
                                </p>
                            }
                        />
                        <div className="mt-7">
                            <h4 className={`text-white ${styles.workTitle}`}>
                                <i className="fa fa-briefcase fa-fw"></i> Our Work
                                <br/><span className={`text-white ${styles.workTagline}`}>These are a handful of projects we've worked on</span>
                            </h4>
                        </div>
                        {/* <div className="row-grid align-items-center row">
                            <div className={`card-deck ${workStyles.cardDeckFlex} ${workStyles.cardDeckTop}`}>
                                {
                                    PROJECTS.map(project => (
                                        <WorkCard
                                            key={project.key}
                                            useIcon={false}
                                            headerText={project.headerText}
                                            headerColor={'text-primary-light'}
                                            archived={project.archived}
                                            description={project.description}
                                            link={project.link}
                                            tech={project.tech}
                                        />
                                    ))
                                }
                            </div>
                        </div> */}
                    </div>
                </section>
                <Footer white={true} />
            </div>
        </main>
    );
}

export default HomePage;
