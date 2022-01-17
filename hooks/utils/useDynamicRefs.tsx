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