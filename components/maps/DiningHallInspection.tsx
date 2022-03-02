import MdiIcon from '@mdi/react';
import styles from '../styling/dining.module.css';
import cardStyles from '../styling/card.module.css';

import { Modal } from '../';
import { Collapse } from 'reactstrap';
import { useDiningHall } from '../../hooks';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import {
    DiningHall,
    DiningHalls,
    DiningHallStatus,
    DiningHallType,
    getDiningHallStatus
} from '@ilefa/blueplate';

import {
    mdiBacteria,
    mdiClockFast,
    mdiFoodOff,
    mdiLink,
    mdiTicketAccount,
    mdiToolbox,
    mdiViewList
} from '@mdi/js';

import {
    generateDdsLink,
    getDateFromTime,
    getEnumKeyByEnumValue,
    getIconForDiningHall,
    getIconForDiningStatus,
    getLatestTimeValue,
    isDiningHallType,
    MealHourEntry,
    StandardMealHours
} from '../../util';

export interface DiningHallInspectionProps {
    hallType: string;
    open: boolean;
    setOpen: (state: boolean) => void;
}

type MealCollapsible = {
    type: string;
    state: boolean;
}

const getModalTitle = (hall: keyof typeof DiningHallType) => (
    <span>
        <span className="text-primary-light">
            {getIconForDiningHall(hall, `fa-fw ${cardStyles.cardModalTitleIcon} mr-2`, 24)}
            <b>{DiningHallType[hall]} ({getDiningHallStatus(DiningHallType[hall])})</b>
        </span>
    </span>
)

const getFooterButtons = (
    hall: DiningHall,
    setOpen: (val: boolean) => void,
    toggleAll: () => void,
    allCollapsed: () => boolean
) => {
    if (isMobile)
        return <></>;

    return (
        <>
            <a
                className="btn btn-link text-lowercase ml--3 mr-auto"
                href={hall.location.maps}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}>
                    <i className="fa fa-map fa-fw"></i> Open with Google Maps
            </a>
            <a
                className={`btn btn-link text-lowercase ${styles['ml--10']}`}
                href={generateDdsLink(hall, new Date())}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}>
                    <i className="fa fa-external-link-alt fa-fw"></i> View DDS
            </a>
            <a
                className={`btn btn-link text-lowercase ml--3`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => toggleAll()}>
                    <i className={`fa ${allCollapsed() ? 'fas fa-compress' : 'fa-expand'} fa-fw`}></i> {allCollapsed() ? 'Collapse All' : 'Expand All'}
            </a>
        </>
    )
}

const QUICK_LINKS = [
    {
        name: 'To-Go Containers',
        href: 'https://dining.uconn.edu/to-go-containers',
        icon: <MdiIcon path={mdiToolbox} size="24px" className="text-primary fa-fw" />
    },
    {
        name: 'Spring 2022 FAQs',
        href: 'https://dining.uconn.edu/covid-updates-faq/',
        icon: <MdiIcon path={mdiBacteria} size="24px" className="text-primary fa-fw" />
    },
    {
        name: 'Meal Plans',
        href: 'https://dining.uconn.edu/meal-plans/',
        icon: <MdiIcon path={mdiViewList} size="24px" className="text-primary fa-fw" />
    },
    {
        name: 'Flex Pass Updates',
        href: 'https://dining.uconn.edu/flex-pass-and-points/',
        icon: <MdiIcon path={mdiTicketAccount} size="24px" className="text-primary fa-fw" />
    },
    {
        name: 'Dietary Preferences',
        href: 'https://dining.uconn.edu/dietary-restrictions-preferences/',
        icon: <MdiIcon path={mdiFoodOff} size="24px" className="text-primary fa-fw" />
    }
]

const getStandardMealHours = (hallType: keyof typeof DiningHallType) => {
    let now = new Date();
    let entries = StandardMealHours[hallType] as MealHourEntry[];
    let today = entries.filter(ent => ent.days.includes(now.getDay()));
    return today.sort((a, b) => getTimeRangeSortingKey(a.start, b.start));
}

const getTimeRangeSortingKey = (a: string, b: string) => {
    let aAM = a.includes('am');
    let bAM = b.includes('am');

    return aAM === bAM
        ? parseInt(a.split(':')[0]) - parseInt(a.split(':')[0])
        : aAM
            ? -1
            : 1;
}

const getMealHourEntries = (hours: MealHourEntry[], now: Date) =>
    hours
        .filter(h => h.days.includes(now.getDay()))
        .sort((a, b) => getTimeRangeSortingKey(a.start, b.start))
        .map((h, i) => ({
            ...h,
            start: getDateFromTime(h.start),
            end: getDateFromTime(h.end),
            index: i
        }));

const getMealServiceString = (hours: MealHourEntry[]) => {
    let now = new Date();
    let entries = getMealHourEntries(hours, now);

    let status = entries.find(h => now >= h.start && now <= h.end);
    if (!status) {
        let nextDay = now.getHours() > entries[entries.length - 1].end.getHours();
        if (nextDay) {
            let date = new Date(now);
            date.setDate(date.getDate() + 1);
            entries = getMealHourEntries(hours, date);
        }
        
        status = { name: 'Closed', start: entries[0].start, end: entries[0].end, index: -1, days: [] };
    }
    
    let isLast = status ? status.index === entries.length - 1 : true;
    let until = isLast
        ? status.end
        : entries[status.index + 1].start;

    if (status.name === 'Closed' && until.getDate() == now.getDate())
        until.setDate(until.getDate() + 1);

    let timeDiff = getLatestTimeValue(until.getTime() - Date.now());
    let next = <>in <b>{timeDiff}</b></>;
    if ((status.name !== 'Reset' && status.name !== 'Closed') && !isLast)
        next = <>for another <b>{timeDiff}</b></>;

    return <>Meal service will {isLast ? 'end' : (status.name === 'Reset' || status.name === 'Closed') ? 'resume' : 'continue'} {next}.</>;
}

export const DiningHallInspection: React.FC<DiningHallInspectionProps> = ({ hallType, open, setOpen }) => {    
    let hall = DiningHalls[hallType] as DiningHall;
    let addr = hall.location.address;
    if (!addr) addr = 'NONE';

    const hallName = isMobile
        ? hall.name
        : hall.location.name.replace(/\+/g, ' ').replace(/\%26/g, '&');

    const updateCollapsible = (type: string) => {
        let target = meals.find(meal => meal.type === type);
        if (!target) {
            let updated = [...meals];
            updated.push({ type, state: false });
            setMeals(updated);
            return;
        }

        let updated = [...meals.filter(meal => meal.type !== type)];
        updated.push({ type, state: !target.state });
        setMeals(updated);
    }

    const allCollapsed = () => meals.every(meal => meal.state);
    const toggleAll = (state = !allCollapsed()) => setMeals(meals.map(meal => ({ ...meal, state })));

    // should never happen, just a precaution
    if (!isDiningHallType(hallType))
        return <></>;

    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'in' : 'at';

    const [meals, setMeals] = useState<MealCollapsible[]>([]);
    const [menu, loading, error] = useDiningHall({
        hall: hallType,
        pollTime: 30000
    });

    useEffect(() => {
        if (!menu)
            return;

        let mealCollapses: MealCollapsible[] = menu!
            .meals
            .map(ent => ({
                type: ent.name,
                state: true
            }));
            
        setMeals(mealCollapses);
    }, [menu]);

    let enabled = !error && !loading && !!menu;
    let mealHours = getStandardMealHours(hallType);

    return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width="850px"
            title={getModalTitle(hallType)}
            footerButtons={getFooterButtons(hall, setOpen, toggleAll, allCollapsed)}
            closeIcon>
                <span>
                    <b>{hallName}</b> {addr === 'NONE' ? 'does not have an address' : <>is located {atOn} <a href={hall.location.maps} className="text-primary shine" target="_blank" rel="noopener noreferrer">{addr}</a></>}.
                    {
                        !!mealHours.length && (
                            <>
                                <br />
                                {getMealServiceString(mealHours)}
                            </>
                        )
                    }
                    <br/>
                    <div className={styles.diningSeparator}></div>
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <span className="text-primary-light">
                                    <MdiIcon path={mdiClockFast} size="24px" className={`fa-fw ${cardStyles.cardModalTitleIcon} mr-2`} />
                                    <b>Meal Hours</b>
                                </span>
                            </div>
                            <div className="mt-3">
                                <ul className={styles.liShift}>
                                    {
                                        !mealHours.length && (
                                            <span className={styles.liShift}>There are no meals being served today.</span>
                                        )
                                    }

                                    {
                                        !!mealHours.length && mealHours.map(key => (
                                            <li key={key.name} className={styles.standardMealTime}>
                                                <div className={styles.mealTime}>
                                                    <div className={styles.head}>
                                                        <h6 className={`text-dark font-weight-bold`}>{key.name}</h6>
                                                    </div>
                                                    <div className={styles.divider}></div>
                                                    <div className={styles.value}>
                                                        <h6 className={`text-dark`}>{key.start} - {key.end}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <span className="text-primary-light">
                                    <MdiIcon path={mdiLink} size="24px" className={`fa-fw ${cardStyles.cardModalTitleIcon} mr-2`} />
                                    <b>Quick Links</b>
                                </span>
                            </div>
                            <div className="mt-3">
                                <ul className={`${styles.quickLinks} text-dark`}>
                                    {
                                        QUICK_LINKS.map(ent => (
                                            <li>
                                                <a href={ent.href} className="text-primary shine" target="_blank" rel="noreferrer noopener">{ent.icon} {ent.name}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    { enabled && menu!.meals.length > 0 && <div className={styles.diningSeparator}></div> }
                    <div className="row">
                        {
                            enabled && menu!.meals.length > 0 &&
                                menu!
                                    .meals
                                    .filter(meal => meal.stations.length)
                                    .map(meal => {
                                        let collapsed = meals.find(ent => ent.type === meal.name)?.state;
                                        let mealKey = getEnumKeyByEnumValue(DiningHallStatus, meal.name) as keyof typeof DiningHallStatus;

                                        return (
                                            <div className="mb-2 col-md-6" key={`${hall.name}-${meal.name}`}>
                                                <div className="mb-1" onClick={() => updateCollapsible(meal.name)}>
                                                    <span className={`text-primary-light ${styles.diningMeal} cursor-pointer shine`}>
                                                        {getIconForDiningStatus(mealKey, styles.diningMealIcon, 24)} {meal.name}
                                                    </span>
                                                </div>
                                                <br />
                                                <Collapse isOpen={collapsed}>
                                                    {
                                                        meal.stations.length && meal.stations.map((station: any) => (
                                                            <div key={`${hall.name}-${meal.name}-${station.name}`}>
                                                                <span className={styles.diningStation}>{station.name}</span>
                                                                <ul className={styles.diningOptions}>
                                                                    {
                                                                        station.options.map(option => (
                                                                            <li key={option}>{option}</li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        ))
                                                    }
                                                </Collapse>
                                            </div>
                                        )
                                    })
                        }
                    </div>
                </span>
        </Modal>
    )
}