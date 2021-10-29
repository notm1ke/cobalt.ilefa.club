import moment from 'moment';

import { Color, getEnumKeyByEnumValue } from '.';

import {
    DiningHall,
    DiningHallStatus,
    DiningHallType,
    getDiningHallStatus
} from '@ilefa/blueplate';

export type DiningHallPayload = DiningHall & {
    status: keyof typeof DiningHallStatus;
}

export enum DiningHallStatusOrdinal {
    BREAKFAST,
    LUNCH,
    BRUNCH,
    DINNER,
    LATE_NIGHT,
    BETWEEN_MEALS,
    CLOSED
}

export enum DiningHallMealHours {
    BREAKFAST = '7:30am - 11:00am',
    BREAKFAST_SOUTH_SAT = '7:00am - 9:30am',
    BREAKFAST_SOUTH_SUN = '8:00am - 9:30am',
    LUNCH = '11:00am - 2:15pm',
    BRUNCH = '10:30 - 2:15pm',
    DINNER = '4:15pm - 7:45pm',
    LATE_NIGHT = '7:45pm - 10:00pm',
    BETWEEN_MEALS = '2:15pm - 4:15pm',
}

/**
 * Returns a color to represent the status of a dining hall.
 * @param hall the dining hall to get the status of
 */
export const getDiningHallStatusColor = (hall: DiningHall | DiningHallPayload): Color => {
    let status = getDiningHallStatus(hall.name as DiningHallType);
    if (!status) return 'purple';

    if ('status' in hall)
        status = DiningHallStatus[hall.status];

    switch (status) {
        case 'Breakfast':
        case 'Brunch':
        case 'Lunch':
        case 'Dinner':
            return 'success';
        case 'Late Night':
            return 'primary';
        case 'Between Meals':
            return 'orange';
        case 'Closed':
            return 'danger';
        default: 
            return 'purple';
    }
}

/**
 * Returns a DDS link for the given dining hall / date.
 * 
 * @param hall the dining hall to get the url for
 * @param date the date of the menu
 */
export const generateDdsLink = (hall: DiningHall, date = new Date()) => {
    let url = `http://nutritionanalysis.dds.uconn.edu/shortmenu.aspx?sName=UCONN+Dining+Services&locationNum=${hall.location.id}&locationName=${hall.location.name}&naFlag=1`;
    if (date.getMonth() !== new Date().getMonth()
        && date.getFullYear() !== new Date().getFullYear()
        && date.getDate() !== new Date().getDate())
            url += `&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=${moment(date).format('MM')}%2f${date.getDate()}%2f${date.getFullYear()}`;

    return url;
}

/**
 * Returns the dining hours for a specified dining hall,
 * and with an optional custom date.
 * 
 * Note: If providing a custom date, you must provide
 * the dining hall status you want to lookup. This is
 * because simply providing the dining hall/date will
 * try to fetch the status at that datetime.
 * 
 * @param hall the dining hall to get meal hours for
 * @param date the date/time to retrieve meal hours for
 */
export const getMealHours = (hall: keyof typeof DiningHallType, date = new Date(), status?: keyof typeof DiningHallStatus) => {
    let mealStatus = status ?? getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[hall])) as keyof typeof DiningHallStatus;
    if (!status) return null;

    if (hall === 'SOUTH' && mealStatus === 'BREAKFAST' && (date.getDay() === 0 || date.getDay() === 6))
        return date.getDay() === 0 ? DiningHallMealHours.BREAKFAST_SOUTH_SUN : DiningHallMealHours.BREAKFAST_SOUTH_SAT;

    return DiningHallMealHours[status];
}