import moment from 'moment';
import MdiIcon from '@mdi/react';
import ReactDateTime from 'react-datetime';

import styles from '../../styling/dining.module.css';
import cardStyles from '../../styling/card.module.css';

import { Collapse } from 'reactstrap';
import { isMobile } from 'react-device-detect';
import { useEffect, useRef, useState } from 'react';
import { Modal, useBoundedClickDetector } from '../..';
import { DiningHallStatus, DiningHallType, Meal } from '@ilefa/blueplate';
import { DiningHallPayload as DHPayload, useDiningHall } from '../../../hooks';

import {
    mdiAlert,
    mdiCalendar,
    mdiEmoticonSad,
    mdiLoading
} from '@mdi/js';

import {
    DiningHallPayload,
    generateDdsLink,
    getChangeString,
    getDiningHallStatusColor,
    getEnumKeyByEnumValue,
    getIconForDiningHall,
    getIconForDiningStatus,
    getMealHours
} from '../../../util';

export interface DiningHallCardProps {
    hall: DiningHallPayload;
    favorites: string[];
    setFavorites: (favorites: string[]) => void;
}

export interface DiningHallModalProps {
    hall: DiningHallPayload;
    open: boolean;
    favorites: string[];
    setOpen: (open: boolean) => void;
    setFavorites: (favorites: string[]) => void;
}

type MealCollapsible = {
    type: string;
    state: boolean;
}

type MealCollapsePredicate = (menu: DiningHallPayload, meal: Meal) => boolean;

const DiningHallMenuModal: React.FC<DiningHallModalProps> = ({ hall, open, favorites, setOpen, setFavorites }) => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [now, setNow] = useState(selectedDate.getDate() === new Date().getDate());
    const [meals, setMeals] = useState<MealCollapsible[]>([]);
    const [dpOpen, setDpOpen] = useState(false);
    const dpWrapper = useRef(null);
    
    useBoundedClickDetector(dpWrapper, () => setDpOpen(false));

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

    const getFoodEntryColor = (item: string, base?: string) => favorites.includes(item) ? `text-gold ${base}` : base ?? '';
    const getServedFavorites = (menu: DHPayload) => {
        let food = menu!
            .meals
            .map(meal =>
                (meal.stations instanceof Array
                    ? meal.stations
                    : [meal.stations])
                .map(station => (station as any).options))
                .reduce((acc, cur) => acc.concat(cur), []);

        return food
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter(item => favorites.includes(item));
    }

    const toggleFavorite = (item: string) => {
        if (favorites.includes(item)) {
            setFavorites(favorites.filter(fav => fav !== item));
            return;
        }

        setFavorites([...favorites, item]);
    }

    const allCollapsed = () => meals.every(meal => meal.state);
    const toggleAll = (state = !allCollapsed()) => setMeals(meals.map(meal => ({ ...meal, state })));

    const dayDiff = selectedDate.getDate() - new Date().getDate();
    const hallKey = getEnumKeyByEnumValue(DiningHallType, hall.name) as keyof typeof DiningHallType;
    
    if (!hallKey) return <></>;
    const [menu, loading, error] = useDiningHall({
        hall: hallKey,
        date: selectedDate,
        now: selectedDate.getDate() === new Date().getDate() && selectedDate.getHours() === new Date().getHours(),
        pollTime: 30000
    });

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
                            // Make sure selected date is at max 23 days in the future or past.
                            Math.abs(moment(current).diff(moment(selected), 'days')) < 23}
                        renderInput={() => <></>}
                        onChange={input => moment.isMoment(input) && setDate(input.toDate())}
                    />
                </div>
            </span> ➜ {hallName} {" "}
            { now && <span className={`text-${getDiningHallStatusColor(hall)}`}>({DiningHallStatus[hall.status]})</span> }
            { !now && <span className="font-weight-bold">({getChangeString(dayDiff, '', 0, true)} day{dayDiff !== 1 ? 's' : ''})</span> }
            { menu && menu.meals && <span className="text-gold ml-2"><i className="fa fa-star fa-fw"></i> {getServedFavorites(menu).length}</span> }
        </span>
    );

    const mealCollapseRules: MealCollapsePredicate[] = [
        (menu, meal) => menu.status === 'BETWEEN_MEALS' && (meal.name === 'Breakfast' || meal.name === 'Brunch' || meal.name === 'Lunch' || meal.name === 'Dinner'),
        (menu, meal) => menu.status === 'BRUNCH' && meal.name === 'Lunch',
        (menu, meal) => menu.status === meal.name.toUpperCase().replace(/\s/g, '_'),
        
        // Northwest + Whitney's late night menus are based on their dinner menus - thus display the dinner menu for each.
        (menu, meal) => menu.status === 'LATE_NIGHT' && (menu.location.id === '15' || menu.location.id === '01') && meal.name === 'Dinner'
    ]

    useEffect(() => {
        let newDate = date;
        if (date.getDate() === new Date().getDate())
            newDate = new Date();

        setNow(date.getDate() === new Date().getDate());
        setDpOpen(false);
        
        setSelectedDate(newDate);
    }, [date]);

    useEffect(() => {
        if (!menu)
            return;

        if (!now) {
            setMeals(meals
                ? meals.map(ent => ({ ...ent, state: true }))
                : menu.meals.map(ent => ({ type: ent.name, state: true })));
            return;
        }

        let mealCollapses: MealCollapsible[] = menu!
            .meals
            .map(ent => ({
                type: ent.name,
                state: mealCollapseRules.some(func => func(menu as any, ent))
            }));
            
        setMeals(mealCollapses);
    }, [menu]);

    if (loading) return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width={'850px'}
            title={modalTitle}>
                <span>
                    <MdiIcon path={mdiLoading} className={`mr-2 ${cardStyles.cardModalInlineIcon} fa-fw`} size={'24px'} spin />
                    Loading information for <b>{hallName}</b>..
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
                    Something went wrong while looking up information about <b>{hallName}</b>!
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
                        className="btn btn-link text-lowercase mr-auto"
                        href={generateDdsLink(hall, selectedDate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}>
                            <i className="fa fa-external-link-alt fa-fw"></i> {auxButtons ? 'View Original' : ''}
                    </a>
                    <a
                        className={`btn btn-link text-lowercase ${auxButtons ? 'ml--28' : 'ml--9'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => toggleAll()}>
                            <i className={`fa ${allCollapsed() ? 'fas fa-compress' : 'fa-expand'} fa-fw`}></i> {auxButtons ? allCollapsed() ? 'Collapse All' : 'Expand All' : ''}
                    </a>
                </>
            }
            title={modalTitle}>
                {
                    !menu!.meals.length && (
                        <span>
                            <MdiIcon path={mdiEmoticonSad} className={`text-primary-light mr-1 ${cardStyles.cardModalInlineIcon} fa-fw`} size={'24px'} />
                            <b>{hallName}</b> isn't serving any food today.
                        </span>
                    )
                }

                {
                    menu!.meals.length > 0 &&
                        menu!
                            .meals
                            .filter(meal => meal.stations.length)
                            .map((meal, i) => {
                                let collapsed = meals.find(ent => ent.type === meal.name)?.state;
                                let mealKey = getEnumKeyByEnumValue(DiningHallStatus, meal.name) as keyof typeof DiningHallStatus;

                                return (
                                    <div className="mb-2" key={`${hall.name}-${meal.name}`}>
                                        <div className="mb-1" onClick={() => updateCollapsible(meal.name)}>
                                            <span className={`text-primary-light ${styles.diningMeal} cursor-pointer shine`}>
                                                {getIconForDiningStatus(mealKey, styles.diningMealIcon, 24)} {meal.name} <span className={styles.diningHours}>({getMealHours(hallKey, selectedDate, mealKey)})</span>
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
                                                                    <li key={option} className={getFoodEntryColor(option, 'cursor-pointer')} onClick={_ => toggleFavorite(option)}>{option}</li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                ))
                                            }
                                            { i !== menu!.meals.length - 1 && <hr /> }
                                        </Collapse>
                                    </div>
                                )
                            })
                }
        </Modal>
    )
}

export const DiningHallCard: React.FC<DiningHallCardProps> = ({ hall, favorites, setFavorites }) => {
    const [open, setOpen] = useState(false);

    let icon = getIconForDiningHall(getEnumKeyByEnumValue(DiningHallType, hall.name) as keyof typeof DiningHallType, cardStyles.cardTitleIcon, 24);
    let statusPrefix = hall.status === 'CLOSED' || hall.status === 'BETWEEN_MEALS'
        ? ''
        : 'serving';
    
    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <a className={`${cardStyles.cardSectionTitle} text-primary-light cursor-pointer shine`} onClick={() => setOpen(true)}>
                                {icon ?? ''} {hall.name}
                            </a>
                        </h5>
    
                        <p className={`text-dark ${cardStyles.cardSectionText}`}>
                            <b>{hall.name}</b> is {statusPrefix} <span className={`text-${getDiningHallStatusColor(hall)} font-weight-500`}>{DiningHallStatus[hall.status].toLowerCase()}</span>.
                        </p>
                        
                        <div className={styles.projectCardLink}>
                            <a className="btn btn-dark btn-sm text-lowercase shine" onClick={() => setOpen(true)}>
                                <i className="fa fa-stream fa-fw"></i> menu
                            </a>

                            <a className="btn btn-dark btn-sm text-lowercase shine" rel="noopener noreferrer" target="_blank" href={hall.location.maps}>
                                <i className="fa fa-map-marked-alt fa-fw"></i> maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <DiningHallMenuModal
                hall={hall}
                open={open}
                favorites={favorites}
                setOpen={setOpen}
                setFavorites={setFavorites}
            />
        </div>
    );
}