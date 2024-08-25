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

import { useState } from 'react';

/**
 * Attempts to store information in the browser's local storage.
 * 
 * @param key the key to store under in local storage
 * @param initial the initial value to store for the specified key
 */
export function useLocalStorage <T>(key: string, initial: T): [T, (value: T) => void] {
    const [stored, setStored] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initial;
        } catch (_error) {
            return initial;
        }
    });

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function
                ? value(stored)
                : value;

            setStored(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (_error) {}
    }
    
    return [stored, setValue];
}