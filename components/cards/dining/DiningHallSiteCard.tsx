import moment from 'moment';
import MdiIcon from '@mdi/react';
import ReactDateTime from 'react-datetime';

import styles from '../../styling/dining.module.css';
import cardStyles from '../../styling/card.module.css';

import { Collapse } from 'reactstrap';
import { isMobile } from 'react-device-detect';
import { useDiningHallSite } from '../../../hooks';
import { useEffect, useRef, useState } from 'react';
import { getIconForDiningStatus } from '../../../util';
import { Modal, useBoundedClickDetector } from '../..';

import {
    DiningHallResponse,
    DiningHallStatus,
    DiningHallType,
    getDiningHallStatus
} from '@ilefa/blueplate';

import {
    mdiAlert,
    mdiCalendar,
    mdiCityVariantOutline,
    mdiEmoticonSad,
    mdiLoading
} from '@mdi/js';

export interface DiningHallSiteCardProps {
    favorites: string[];
    setFavorites: (favorites: string[]) => void;
}

export interface DiningHallSiteModalProps {
    open: boolean;
    favorites: string[];
    setOpen: (open: boolean) => void;
    setFavorites: (favorites: string[]) => void;
}

type UniversalMealOption = {
    name: string;
    mealTime: string;
    diningHalls: string[];
}

type MealCollapsible = {
    type: string;
    state: boolean;
}

type Station = {
    name: string;
    options: string[];
}

enum DiningHallStatusSorting {
    BREAKFAST = 0,
    BRUNCH = 1,
    LUNCH = 2,
    DINNER = 3,
    LATE_NIGHT = 4
}

// TODO: please please please refactor, it hurts my eyes
const coalesce = (payload: DiningHallResponse[]) => {
    let items: UniversalMealOption[] = [];
    for (const hall of payload) {
        for (const meal of hall.meals) {
            let stations: Station[] = meal.stations instanceof Array
                ? meal.stations as any
                : [meal.stations as any];

            for (const { options } of stations) {
                for (const option of options) {
                    const item = items.find(i => i.name === option && i.mealTime === meal.name);
                    if (item) {
                        item.diningHalls.push(hall.name);
                        continue;
                    }

                    items.push({
                        name: option,
                        mealTime: meal.name,
                        diningHalls: [hall.name]
                    });
                }
            }
        }
    }

    return items;
}

const splitByMealTime = (items: UniversalMealOption[]) => {
    let mealTimes: { [key: string]: UniversalMealOption[] } = {};
    for (const item of items) {
        const meal = mealTimes[item.mealTime];
        if (meal) {
            meal.push(item);
            continue;
        }

        mealTimes[item.mealTime] = [item];
    }

    return mealTimes;
}

const offeredAt = (item: UniversalMealOption) => {
    let halls = [...new Set(item.diningHalls)].sort((a, b) => a.localeCompare(b));
    if (halls.length === 8)
        return 'All Dining Halls';
    return halls.join(', ');
}

interface FoodEntriesContainerProps {
    mealTime: string;
    food: UniversalMealOption[];
    collapsed: boolean;
    favorites: string[];
    updateCollapsible: (type: string) => void;
    setFavorites: (favorites: string[]) => void;
}

const FoodEntriesContainer: React.FC<FoodEntriesContainerProps> = ({ mealTime, food, collapsed, favorites, updateCollapsible, setFavorites }) => {
    const getFoodEntryColor = (item: string, base?: string, def: string = 'text-default') => favorites.includes(item) ? `text-gold ${base}` : `${def ?? ''} ${base ?? ''}`;

    const toggleFavorite = (item: string) => {
        if (favorites.includes(item)) {
            setFavorites(favorites.filter(fav => fav !== item));
            return;
        }

        setFavorites([...favorites, item]);
    }

    return (
        <div>
            <div className="mb-1" onClick={() => updateCollapsible(mealTime)}>
                <span className={`text-primary-light ${styles.diningMeal} cursor-pointer shine`}>
                    {getIconForDiningStatus((mealTime.toUpperCase()) as keyof typeof DiningHallStatus, styles.diningMealIcon, 24)} {mealTime} <span className={styles.diningHours}></span>
                </span>
            </div>
            <ul className={`${styles.diningOptions} text-default mt-2`}>
                <Collapse isOpen={collapsed}>
                    {
                        food
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(option => (
                                <li key={option.name}>
                                    <b className={getFoodEntryColor(option.name, 'cursor-pointer', 'text-default')} onClick={() => toggleFavorite(option.name)}>{option.name}</b> at {offeredAt(option)}
                                </li>
                            ))
                    }
                </Collapse>
            </ul>
        </div>
    );
}

const DiningHallSiteMenuModal: React.FC<DiningHallSiteModalProps> = ({ open, favorites, setOpen, setFavorites }) => {
    const [date, setDate] = useState(new Date());
    const [dpOpen, setDpOpen] = useState(false);
    const [meals, setMeals] = useState<UniversalMealOption[]>([]);
    const [collapse, setCollapse] = useState<MealCollapsible[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [now, setNow] = useState(selectedDate.getDate() === new Date().getDate());

    const dpWrapper = useRef(null);

    useBoundedClickDetector(dpWrapper, () => setDpOpen(false));

    const modalTitle = (
        <span>
            <span className="text-primary-light cursor-pointer text-primary-light">
                <MdiIcon path={mdiCalendar} size={'24px'} className={`fa-fw ${cardStyles.cardModalTitleIcon} mr-2`} /> 
                <b onClick={() => setDpOpen(!dpOpen)}>{moment(selectedDate).format('MMM Do')}</b>
                <div ref={dpWrapper} className={styles.diningDatePickerWrapper}>
                    <ReactDateTime
                        open={dpOpen}
                        value={selectedDate}
                        timeFormat={false}
                        isValidDate={(current: Date, selected: Date) => 
                            Math.abs(moment(current).diff(moment(selected), 'days')) < 23}
                        renderInput={() => <></>}
                        onChange={input => moment.isMoment(input) && setDate(input.toDate())}
                    />
                </div>
            </span> ➜ All Dining Halls {" "}
            { meals && <span className="text-gold ml-1"><i className="fa fa-star fa-fw"></i> {meals.map(meal => meal.name).filter(item => favorites.includes(item)).length}</span> }
        </span>
    );
    
    const [menu, loading, error] = useDiningHallSite({ date: selectedDate, now });

    const updateCollapsible = (type: string) => {
        let target = collapse.find(meal => meal.type === type);
        if (!target) {
            let updated = [...collapse];
            updated.push({ type, state: false });
            setCollapse(updated);
            return;
        }

        let updated = [...collapse.filter(meal => meal.type !== type)];
        updated.push({ type, state: !target.state });
        setCollapse(updated);
    }

    const allCollapsed = () => collapse.every(meal => meal.state);
    const toggleAll = (state = !allCollapsed()) => setCollapse(collapse.map(meal => ({ ...meal, state })));

    useEffect(() => {
        let newDate = date;
        if (date.getDate() === new Date().getDate())
            newDate = new Date();

        setNow(date.getDate() === new Date().getDate());
        setDpOpen(false);
        
        setSelectedDate(newDate);
    }, [date]);

    useEffect(() => {
        if (!menu || !menu.length)
            return;

        setMeals(coalesce(menu));
        setCollapse(Object.keys(splitByMealTime(coalesce(menu))).map(meal => ({ type: meal, state: true })));
    }, [menu]);

    if (loading) return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width="850px"
            title={modalTitle}>
                <span>
                    <MdiIcon path={mdiLoading} className={`mr-2 ${cardStyles.cardModalInlineIcon} fa-fw`} size={'24px'} spin />
                    Loading site data..
                </span>
        </Modal>
    );

    if (error) return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width="850px"
            title={modalTitle}>
                <span>
                    <MdiIcon path={mdiAlert} className={`text-danger mr-2 ${cardStyles.cardModalInlineIcon} fa-fw`} size={'24px'} />
                    Something went wrong while retrieving data for this site!
                </span>
        </Modal>
    );

    let auxButtons = !isMobile;

    return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width="850px"
            closeIcon
            footerButtons={
                <>
                    <a
                        className="btn btn-link text-lowercase"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => toggleAll()}>
                            <i className={`fa ${allCollapsed() ? 'fas fa-compress' : 'fa-expand'} fa-fw`}></i> {auxButtons ? allCollapsed() ? 'Collapse All' : 'Expand All' : ''}
                    </a>
                </>
            }
            title={modalTitle}>
                {
                    !menu!.length && (
                        <span>
                            <MdiIcon path={mdiEmoticonSad} className={`text-primary-light mr-1 ${cardStyles.cardModalInlineIcon} fa-fw`} size={'24px'} />
                            No food is being serving today.
                        </span>
                    )
                }

                {
                    meals!.length > 0 && (
                        <pre className="text-primary">
                            {
                                Object
                                    .entries(splitByMealTime(meals))
                                    .sort(([aTime, _a], [bTime, _b]) => DiningHallStatusSorting[aTime.toUpperCase().replace(/\s/g, '_')] - DiningHallStatusSorting[bTime.toUpperCase().replace(/\s/g, '_')])
                                    .map(([mealTime, food]) => (
                                        <FoodEntriesContainer
                                            key={mealTime}
                                            mealTime={mealTime}
                                            food={food}
                                            collapsed={collapse.find(ent => ent.type === mealTime)?.state ?? false}
                                            favorites={favorites}
                                            updateCollapsible={updateCollapsible}
                                            setFavorites={setFavorites}
                                        />
                                    ))
                            }
                        </pre>
                    )
                }
        </Modal>
    )
}

export const DiningHallSiteCard: React.FC<DiningHallSiteCardProps> = ({ favorites, setFavorites }) => {
    const [open, setOpen] = useState(false);

    let diningHallsOpen: DiningHallType[] = [];
    let diningHallsClosed: DiningHallType[] = [];

    for (const hall of Object.values(DiningHallType)) {
        let status = getDiningHallStatus(hall);
        if (status === DiningHallStatus.BETWEEN_MEALS || status === DiningHallStatus.CLOSED)
            diningHallsClosed.push(hall);
        else diningHallsOpen.push(hall);
    }

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <a className={`${cardStyles.cardSectionTitle} text-primary-light cursor-pointer shine`} onClick={() => setOpen(true)}>
                                <MdiIcon path={mdiCityVariantOutline} size="24px" className={`fa-fw ${cardStyles.cardTitleIcon}`} /> All Food
                            </a>
                        </h5>

                        <p className={`text-dark ${cardStyles.cardSectionText}`}>
                            { diningHallsOpen.length === 1 && <><span className="text-dark"><b>{diningHallsOpen[0]}</b> is the only dining hall currently serving food.</span></> }
                            { diningHallsOpen.length > 1 && <><b>{diningHallsOpen.length}</b> dining halls are currently serving food.</> }
                            { diningHallsOpen.length === 0 && <span>No dining halls currently serve food.</span> }
                        </p>
                    </div>
                </div>
            </div>
            <DiningHallSiteMenuModal
                open={open}
                favorites={favorites}
                setOpen={setOpen}
                setFavorites={setFavorites}
            />
        </div>
    );
}