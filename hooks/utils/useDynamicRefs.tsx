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

import * as React from "react";

const map = new Map<string, React.Ref<unknown>>();

function setRef<T>(key: string): React.Ref<T> {
    const ref = React.createRef<T>();
    map.set(key, ref);
    return ref;
}

function getRef<T>(key: string): React.Ref<T> {
    return map.get(key) as React.Ref<T>;
}

export function useDynamicRefs<T>(): [
    (key: string) => React.Ref<T>,
    (key: string) => React.Ref<T>
] {
    return [getRef, setRef];
}