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
import Head from 'next/head';
import Error404 from '../404';
import MdiIcon from '@mdi/react';

import styles from '../../components/styling/building.module.css';
import cardStyles from '../../components/styling/card.module.css';
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
    let buildingName = BuildingCode[buildingCode];

    const [site, _url, loading, error] = useManagedSite({ sites: [buildingCode] as BuildingCodeKey[] });
    const enabled = !loading && !error && site;

    let addr = BuildingAddresses[buildingCode] ?? 'NONE';
    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'on' : 'at';

    return (
        <main>
            <Head>
                <title>Cobalt » {BuildingCode[buildingCode]}</title>
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
                                The <b>{buildingName.endsWith('Building') ? buildingName : buildingName + ' Building'}</b> {addr === 'NONE' ? 'does not have an address' : <>is located {atOn} <a href={BuildingMaps[buildingCode]} className={`text-light ${styles.buildingLink} shine`} target="_blank" rel="noopener noreferrer">{BuildingAddresses[buildingCode]}</a></>}.
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
                                        enabled && site!
                                            .sites[0]
                                            .schedules
                                            .filter(item => (item as any).room)
                                            .sort((a, b) => (a as any).room.localeCompare((b as any).room))
                                            .map(ent => (
                                                <div className="col-md-4 align-items-stretch" key={(ent as any).room}>
                                                    <BuildingDirectoryCard name={(ent as any).room} room={ent.entries} />
                                                </div>
                                            ))
                                    }

                                    {
                                        (enabled && site!.sites[0].schedules.length === 0 || error) && (
                                            <div className="col-md-12 text-center">
                                                <div className={`card shadow shadow-lg--hover mt-5 pb-2 ${cardStyles.rgCard}`}>
                                                    <div className="card-body">
                                                        <p className="text-danger">
                                                            <i className="fa fa-exclamation-triangle fa-fw"></i> There are no rooms with schedules for <b>{BuildingCode[buildingCode]}</b>.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
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
