import moment from 'moment';
import MdiIcon from '@mdi/react';
import ReactDateTime from 'react-datetime';

import styles from '../../styling/dining.module.css';
import cardStyles from '../../styling/card.module.css';

import { useDiningHallSite } from '../../../hooks';
import { useEffect, useRef, useState } from 'react';
import { DiningHallResponse } from '@ilefa/blueplate';
import { Modal, useBoundedClickDetector } from '../..';

import {
    mdiAlert,
    mdiCalendar,
    mdiEmoticonSad,
    mdiFood,
    mdiLoading
} from '@mdi/js';

export interface DiningHallSiteModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

type UniversalMealOption = {
    name: string;
    mealTime: string[];
    diningHalls: string[];
}

type Station = {
    name: string;
    options: string[];
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
                    const item = items.find(i => i.name === option);
                    if (item) {
                        item.diningHalls.push(hall.name);
                        !item.mealTime.includes(meal.name) && item.mealTime.push(meal.name);
                        continue;
                    }

                    items.push({
                        name: option,
                        mealTime: [meal.name],
                        diningHalls: [hall.name]
                    });
                }
            }
        }
    }

    return items;
}

const DiningHallSiteMenuModal: React.FC<DiningHallSiteModalProps> = ({ open, setOpen }) => {
    const [date, setDate] = useState(new Date());
    const [dpOpen, setDpOpen] = useState(false);
    const [meals, setMeals] = useState<UniversalMealOption[]>([]);
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
        </span>
    );
    
    const [menu, loading, error] = useDiningHallSite({ date: selectedDate, now });

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
    }, [menu]);

    if (loading) return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width={'850px'}
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
            width={'850px'}
            title={modalTitle}>
                <span>
                    <MdiIcon path={mdiAlert} className={`text-danger mr-2 ${cardStyles.cardModalInlineIcon} fa-fw`} size={'24px'} />
                    Something went wrong while retrieving data for this site!
                </span>
        </Modal>
    );

    return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width={'850px'}
            closeIcon
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
                            {JSON.stringify(meals, null, 3)}
                        </pre>
                    )
                }
        </Modal>
    )
}

export const DiningHallSiteCard: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <a className={`${cardStyles.cardSectionTitle} text-primary-light cursor-pointer shine`} onClick={() => setOpen(true)}>
                                <MdiIcon path={mdiFood} size="24px" className={`fa-fw ${cardStyles.cardTitleIcon}`} /> All Food
                            </a>
                        </h5>
                    </div>
                </div>
            </div>
            <DiningHallSiteMenuModal open={open} setOpen={setOpen} />
        </div>
    );
}