import { Color } from '.';
import { DiningHall, DiningHallType, getDiningHallStatus } from '@ilefa/blueplate';

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
            return 'green';
        case 'Late Night':
            return 'primary-light';
        case 'Between Meals':
            return 'warning';
        case 'Closed':
            return 'danger';
        default: 
            return 'purple';
    }
}