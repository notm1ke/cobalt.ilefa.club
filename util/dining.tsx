import moment from 'moment';

import { Color, getEnumKeyByEnumValue, isDevelopment } from '.';

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

export const getRealDiningHallStatus = (hall: DiningHallType, time: Date) => {
    let type = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[hall.toUpperCase()], time));
    if (!type) return null;
    if (isDevelopment()) return type;

    let index = DiningHallStatusOrdinal[type] - 1;
    return DiningHallStatus[index < 0 ? 0 : index];
}