import React from 'react';
import Head from 'next/head';
import MdiIcon from '@mdi/react';
import Gallery from 'react-grid-gallery';

import styles from '../../components/styling/info.module.css';
import globalStyles from '../../components/styling/home.module.css';
import attributionStyles from '../../components/styling/attribution.module.css';

import { useDorm } from '../../hooks';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { Badge, UncontrolledTooltip } from 'reactstrap';

import {
    ContributorButton,
    ErrorView,
    Footer,
    InlineLink,
    Loader,
    Nav
} from '../../components';

import {
    mdiAccountSupervisorCircle,
    mdiInformation,
    mdiMapSearch,
    mdiNumeric1Circle,
    mdiNumeric2Circle,
    mdiNumeric3Circle,
    mdiNumeric4Circle
} from '@mdi/js';

import {
    capitalizeFirst,
    DormAmenityType,
    DormHallAbbreviation,
    DormHallAddresses,
    DormHallDescriptions,
    DormHallMaps,
    DormHallType,
    evaluateDormTokenToKey,
    getIconForResHall,
    intToWords
} from '../../util';

interface ResidentCompositionProps {
    percent: number;
    group: string;
    icon?: JSX.Element;
    displayIfNone?: boolean;
}

const ResidentComposition: React.FC<ResidentCompositionProps> = ({ percent, group, icon, displayIfNone }) => {
    if (!displayIfNone && percent === 0)
        return <></>;

    return <li className={styles.composition}>{icon ?? ''} <span className={styles.compositionPercent}>{percent.toFixed(2)}%</span> {group}</li>
}

const generateAmenityBadge = (bool: boolean) => (
    <Badge color={bool ? 'success' : 'danger'} pill>
        {
            bool
                ? <i className="fa fa-check fa-fw"></i>
                : <i className="fa fa-times fa-fw"></i>
        }
    </Badge>
);

const DormInspectionPage = () => {
    const router = useRouter();
    const building = router.query.building;

    if (building instanceof Array) return
        <ErrorView
            title="Bad Request"
            message="Woah there, your request was a bit weird."
            goBack />

    const hall = evaluateDormTokenToKey(building ?? '');
    const [data, loading, error] = useDorm({ hall });
    if (loading) return <Loader />;
    if (error) return
        <ErrorView
            title="Whoops"
            message="Something went wrong while processing your request, please try again later."
            goBack />;

    let name = DormHallType[data!.hall];
    let ending = (name?.endsWith('Apts') || name?.endsWith('Apartments'))
        ? 'Apartment Complex'
        : name?.endsWith('Residence Hall')
            ? name
            : 'Residence Hall';

    let icon = getIconForResHall(data!.hall, globalStyles.nameTitleIcon, 40);
    let assets = data!.assets.map(asset => ({
        src: asset.url,
        thumbnail: asset.thumbnail,
        thumbnailWidth: asset.width,
        thumbnailHeight: asset.height,
        alt: `Unresolvable ${asset.url.includes('mp4') ? 'Video' : 'Picture'}`,
        caption: DormHallType[data!.hall]
    }));

    return (
        <main>
            <Head>
                <title>Cobalt » {DormHallType[data!.hall]}</title>
            </Head>
            <Nav />
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={globalStyles.pageHeader}>
                        <div className="container shape-container d-flex align-items-center py-lg">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>{icon}{name ?? capitalizeFirst(building.toLowerCase())}</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            {DormHallAddresses[data!.hall]}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.infoSection} background-circuits`}>
                    <div className="container" id="body">
                        <h4 className={`text-white ${styles.infoSectionTitle} mt--5 mb-7 pb-4`}>
                            <i className="fa fa-images fa-fw mb-4"></i> Imagery
                            <Gallery images={assets} enableImageSelection={false} />
                        </h4>

                        <br />
                        <h4 className={`text-white ${styles.infoSectionTitle} mb-7`}>
                            <i className="fa fa-building fa-fw"></i> {capitalizeFirst(ending)} Information
                            <br /><span className={`text-white ${styles.infoSectionBody}`}>
                                {DormHallDescriptions[data!.hall]}
                                {data!.ratings && (
                                    <span><br/><br/>{" "}
                                        Overall, <b>{DormHallType[data!.hall]}</b> was rated a <b className={`${styles.infoLink} shine`} id="ratings">
                                            {data!.ratings.ratingOverall.toFixed(2)}/5.00
                                            <UncontrolledTooltip target="ratings" placement="top" delay={0}>
                                                <b>Overall:</b> {data!.ratings.ratingOverall.toFixed(2)}/5.00<br/>
                                                <b>Bathrooms:</b> {data!.ratings.ratingBathroom.toFixed(2)}/5.00<br/>
                                                <b>Buildings:</b> {data!.ratings.ratingBuilding.toFixed(2)}/5.00<br/>
                                                <b>Location:</b> {data!.ratings.ratingLocation.toFixed(2)}/5.00<br/>
                                            </UncontrolledTooltip>
                                        </b> by {intToWords(data!.ratings.numReviews)} residents and <b>{(data!.ratings.recommend * 100).toFixed(2)}%</b> of them recommended it.
                                        <br/><br/><span className={styles.resHallInfoTitle}>Resident Composition:</span>
                                        <ResidentComposition percent={data!.ratings.yearFreshman * 100} group="Freshman" displayIfNone icon={<MdiIcon path={mdiNumeric1Circle} className={`text-primary ${styles.compositionIcon}`} size={'24px'} />} /> 
                                        <ResidentComposition percent={data!.ratings.yearSophomore * 100} group="Sophomore" displayIfNone icon={<MdiIcon path={mdiNumeric2Circle} className={`text-primary ${styles.compositionIcon}`} size={'24px'} />} />
                                        <ResidentComposition percent={data!.ratings.yearJunior * 100} group="Junior" displayIfNone icon={<MdiIcon path={mdiNumeric3Circle} className={`text-primary ${styles.compositionIcon}`} size={'24px'} />} /> 
                                        <ResidentComposition percent={data!.ratings.yearSenior * 100} group="Senior" displayIfNone icon={<MdiIcon path={mdiNumeric4Circle} className={`text-primary ${styles.compositionIcon}`} size={'24px'} />} /> 
                                        <ResidentComposition percent={data!.ratings.yearGraduateStudent * 100} group="Grads" icon={<MdiIcon path={mdiAccountSupervisorCircle} className={`text-primary ${styles.compositionIcon}`} size={'24px'} />} /> 
                                        <br/><span className={styles.resHallInfoTitle}>Amenities:</span><br/>
                                        {
                                            Object
                                                .keys(data!.ratings.amenities_boolean)
                                                .map(key => ({ key, value: data!.ratings.amenities_boolean[key] }))
                                                .sort((a, b) => a.key.localeCompare(b.key))
                                                .sort((a, b) => b.value - a.value)
                                                .map(({ key, value }) => <><span>{generateAmenityBadge(value)} <span className={styles.amenityKey}>{DormAmenityType[key.replace('-', '_').toUpperCase()]}</span></span><br/></>)
                                        }
                                    </span>
                                )}
                            </span><br/>
                            {DormHallMaps[data!.hall] ? <a href={DormHallMaps[data!.hall]} className="btn btn-dark bg-ilefa-dark shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                <span className="btn-inner--icon"><MdiIcon path={mdiMapSearch} size="20px" /></span>
                                <span className="btn-inner--text">View on Google Maps</span>
                            </a> : ''}
                            <a href={`https://maps.uconn.edu/m/info/${DormHallAbbreviation[data!.hall]}`} className="btn btn-dark bg-ilefa-dark shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                <span className="btn-inner--icon"><MdiIcon path={mdiInformation} size="20px" /></span>
                                <span className="btn-inner--text">Information</span>
                            </a>
                        </h4>

                        <h4 className={`text-white ${styles.infoSectionTitle} mb-5`}>
                            <i className="fa fa-people-carry fa-fw"></i> Contributors
                            <br /><span className={`text-white ${styles.infoSectionBody}`}>
                                Thank you to the following users of the <InlineLink display="r/UConnDorms" href="https://reddit.com/r/UConnDorms" newTab /> subreddit for contributing images of their own.
                                {
                                    data!
                                        .sources
                                        .filter((val, i, self) => self
                                            .map(elem => elem.author.id)
                                            .indexOf(val.author.id) === i)
                                        .map(source =>
                                            <ContributorButton
                                                name={`u/${source.author.name}`}
                                                link={`https://reddit.com/u/${source.author.name}`}
                                                platform={<i className={`fab fa-reddit text-orange ${attributionStyles.platformBadge}`}></i>}
                                                avatar={<img className={attributionStyles.contributorImage} src={source.author.avatar} />}
                                                className={isMobile ? 'btn btn-dark bg-ilefa-dark shine btn-icon mt-3 mb-sm-0 text-lowercase w-100' : undefined}
                                            />
                                        )
                                }
                            </span>
                        </h4>
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default DormInspectionPage;
