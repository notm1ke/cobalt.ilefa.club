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

import { useEffect } from 'react';

export const useBoundedClickDetector = (ref, handler: () => void) => 
    useEffect(() => {
        const handleOutside = event => {
            if (!ref.current)
                return;
            !ref.current.contains(event.target) && handler();
        }

        document.addEventListener('mousedown', handleOutside, true);
        return () => document.removeEventListener('mousedown', handleOutside, true);
    }, [ref]);