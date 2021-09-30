import moment from 'moment';
import MdiIcon from '@mdi/react';
import ReactDateTime from 'react-datetime';

import styles from '../styling/dining.module.css';
import cardStyles from '../styling/card.module.css';

import { useDiningHall } from '../../hooks';
import { isMobile } from 'react-device-detect';
import { useEffect, useRef, useState } from 'react';
import { Modal, useBoundedClickDetector } from '..';
import { DiningHallStatus, DiningHallType } from '@ilefa/blueplate';

import {
    mdiAlert,
    mdiCalendar,
    mdiEmoticonSad,
    mdiLoading
} from '@mdi/js';

import {
    DiningHallPayload,
    generateDdsLink,
    getDiningHallStatusColor,
    getEnumKeyByEnumValue,
    getIconForDiningHall,
    getIconForDiningStatus
} from '../../util';

export interface DiningHallCardProps {
    hall: DiningHallPayload;
}

export interface DiningHallModalProps {
    hall: DiningHallPayload;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DiningHallMenuModal: React.FC<DiningHallModalProps> = ({ hall, open, setOpen }) => {
    const [date, setDate] = useState(new Date());
    const [dpOpen, setDpOpen] = useState(false);
    const dpWrapper = useRef(null);

    useBoundedClickDetector(dpWrapper, () => setDpOpen(false));

    const hallName = isMobile
        ? hall.name
        : hall.location.name.replace(/\+/g, ' ').replace(/\%26/g, '&');

    const hallKey = getEnumKeyByEnumValue(DiningHallType, hall.name) as keyof typeof DiningHallType;
    const modalTitle = (
        <span>
            <span className="text-primary-light cursor-pointer text-primary-light">
                <MdiIcon path={mdiCalendar} size={'24px'} className={`fa-fw ${cardStyles.cardModalTitleIcon} mr-2`} /> 
                <b onClick={() => setDpOpen(!dpOpen)}>{moment(date).format('MMM Do')}</b>
                <div ref={dpWrapper} className={styles.diningDatePickerWrapper}>
                    <ReactDateTime
                        open={dpOpen}
                        value={date}
                        timeFormat={false}
                        isValidDate={(current: Date, selected: Date) => 
                            // Make sure selected date is at max 23 days in the future or past.
                            Math.abs(moment(current).diff(moment(selected), 'days')) < 23}
                        renderInput={() => <></>}
                        onChange={input => moment.isMoment(input) && setDate(input.toDate())}
                    />
                </div>
            </span> ➜ {hallName} <span className={`text-${getDiningHallStatusColor(hall)}`}>({DiningHallStatus[hall.status]})</span>
        </span>
    );

    useEffect(() => setDpOpen(false), [date]);

    if (!hallKey) return <></>;
    const [menu, loading, error] = useDiningHall({ hall: hallKey, date });

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
            width={'850px'}
            title={modalTitle}>
                <span>
                    <MdiIcon path={mdiAlert} className={`text-danger mr-2 ${cardStyles.cardModalInlineIcon} fa-fw`} size={'24px'} />
                    Something went wrong while looking up information about <b>{hallName}</b>!
                </span>
        </Modal>
    );

    return (
        <Modal
            open={open}
            setOpen={() => setOpen(false)}
            width={'850px'}
            closeIcon
            footerButtons={
                <a
                    className="btn btn-link text-lowercase mr-auto"
                    href={generateDdsLink(hall, date)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}>
                        <i className="fa fa-external-link-alt fa-fw"></i> View Original
                </a>
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
                            .map((meal, i) => (
                                <div className="mb-2" key={`${hall.name}-${meal.name}`}>
                                    <div className="mb-1">
                                        <span className={`text-primary-light ${styles.diningMeal}`}>
                                            {getIconForDiningStatus(getEnumKeyByEnumValue(DiningHallStatus, meal.name) as keyof typeof DiningHallStatus, styles.diningMealIcon, 24)} {meal.name}
                                        </span>
                                    </div>
                                    <br />
                                    {
                                        meal.stations.length && meal.stations.map((station: any) => (
                                            <div key={`${hall.name}-${meal.name}-${station}`}>
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
                                    { i !== menu!.meals.length - 1 && <hr /> }
                                </div>
                            ))
                }
        </Modal>
    )
}

export const DiningHallCard: React.FC<DiningHallCardProps> = ({ hall }) => {
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
                        </div>
                    </div>
                </div>
            </div>
            <DiningHallMenuModal hall={hall} open={open} setOpen={setOpen} />
        </div>
    );
}