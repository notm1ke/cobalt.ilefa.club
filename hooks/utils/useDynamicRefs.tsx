/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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