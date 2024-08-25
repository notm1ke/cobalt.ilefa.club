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

import { useLocalStorage } from '../../hooks';
import { useEffect, useState } from 'react';

export interface OneTimeViewProps {
    /**
     * The target ``localStorage`` key to check if the component
     * has been rendered before this instance.
     */
    target: string;
}

export const OneTimeView: React.FC<OneTimeViewProps> = ({ target, children }) => {
    const [rendered, setRendered] = useState(false);
    const [value, setValue] = useLocalStorage(target, true);

    useEffect(() => {
        setRendered(value);
        setValue(false);
    }, []);

    if (!rendered)
        return <></>;

    if (!value && !rendered)
        return <></>;

    return <>{children}</>;
}