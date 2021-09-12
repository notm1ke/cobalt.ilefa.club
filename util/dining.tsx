import moment from 'moment';

import { Color } from '.';

import {
    DiningHall,
    DiningHallType,
    getDiningHallStatus
} from '@ilefa/blueplate';

/**
 * Returns a color to represent the status of a dining hall.
 * @param hall the dining hall to get the status of
 */
export const getDiningHallStatusColor = (hall: DiningHall): Color => {
    let status = getDiningHallStatus(hall.name as DiningHallType);
    if (!status) return 'purple';

    switch (status) {
        case 'Breakfast':
        case 'Brunch':
        case 'Lunch':
        case 'Dinner':
            return 'warp';
        case 'Late Night':
            return 'primary';
        case 'Between Meals':
            return 'warning';
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