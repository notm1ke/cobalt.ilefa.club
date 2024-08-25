/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useEffect, useState } from 'react';
import { getLatestTimeValue, getTimeUntilRecClose } from '../../../util';

export const RecUntilCloseTagline: React.FC = () => {
    const [untilClose, setUntilClose] = useState(getTimeUntilRecClose('SRC'));
    const [reload, setReload] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (!timer) setTimer(setInterval(() => setReload(!reload), 1000));

        if (reload) {
            setReload(false);
            setUntilClose(getTimeUntilRecClose('SRC'));
        }

        return () => {
            if (timer) clearInterval(timer);
        }
    }, [reload, timer]);

    return (
        <span>
            { 
                untilClose <= 0
                    ? 'Currently closed'
                    : `Closing in ${getLatestTimeValue(untilClose)}`
            }
        </span>
    );
}