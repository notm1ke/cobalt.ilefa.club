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
import Error404 from '../404';
import MdiIcon from '@mdi/react';

import styles from '../../components/styling/building.module.css';
import globalStyles from '../../components/styling/home.module.css';

import { useRouter } from 'next/router';
import { BuildingCode } from '@ilefa/husky';
import { mdiInformation, mdiMapSearch } from '@mdi/js';
import { BuildingCodeKey, useManagedSite } from '../../hooks';
import { BuildingDirectoryCard, Footer, Nav } from '../../components';

import {
    BuildingAddresses,
    BuildingDescriptions,
    BuildingMaps,
    getIconForBuilding
} from '../../util';

const BuildingInspectionPage = () => {
    const router = useRouter();
    const { name } = router.query;

    if (!name || name instanceof Array || !BuildingCode[name.toUpperCase()])
        return <Error404 />;
    
    let buildingCode = (name as string).toUpperCase();

    const [site, _url, loading, error] = useManagedSite({ sites: [buildingCode] as BuildingCodeKey[] });
    const enabled = !loading && !error && site;

    let addr = BuildingAddresses[buildingCode] ?? 'NONE';
    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'on' : 'at';

    return (
        <main>
            <Head>
                <title>Cobalt » {enabled ? '' : BuildingCode[name]}</title>
                <meta name="description" content={`Explore rooms, schedules, and more for ${BuildingCode[buildingCode]}`} />
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
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>{buildingCode}</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            {BuildingCode[buildingCode]}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.buildingSection} background-circuits`}>
                    <div className="container" id="body">
                        <h4 className={`text-white ${styles.buildingSectionTitle} mb-7`}>
                            { getIconForBuilding(buildingCode as any, styles.buildingIcon, 24) } {BuildingCode[buildingCode]} ({buildingCode})
                            <br/><span className={`text-white ${styles.buildingSectionBody}`}>
                                The <b>{name.endsWith('Building') ? name : name + ' Building'}</b> {addr === 'NONE' ? 'does not have an address' : <>is located {atOn} <a href={BuildingMaps[buildingCode]} className={`text-light ${styles.buildingLink} shine`} target="_blank" rel="noopener noreferrer">{BuildingAddresses[buildingCode]}</a></>}.
                                <br/>
                                {BuildingDescriptions[buildingCode] || 'This building does not have a description.'}
                                <br/>
                                
                                <a href={BuildingMaps[buildingCode]} className="btn btn-dark bg-ilefa-dark shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                    <span className="btn-inner--icon vaTextBottom"><MdiIcon path={mdiMapSearch} size="20px" /></span>
                                    <span className="btn-inner--text">View on Google Maps</span>
                                </a>
                                
                                <a href={`https://maps.uconn.edu/m/info/${buildingCode}`} className="btn btn-dark bg-ilefa-dark shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                    <span className="btn-inner--icon vaTextBottom"><MdiIcon path={mdiInformation} size="20px" /></span>
                                    <span className="btn-inner--text">Information</span>
                                </a>
                                
                                <div className="row">
                                    {
                                        enabled && site
                                            .sites[0]
                                            .schedules
                                            .sort((a, b) => (a as any).title.localeCompare((b as any).title))
                                            .map(ent => {
                                                console.log('a');
                                                return (
                                                    <div className="col-md-4 d-flex align-items-stretch w-100" key={(ent as any).title}>
                                                        <BuildingDirectoryCard name={(ent as any).title} room={ent.entries} />
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </span>
                        </h4>
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default BuildingInspectionPage;
