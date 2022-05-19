/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { useCallback, useState } from 'react';

type UseToggleReturn = [boolean, () => void];

export const useToggle = (initial = false): UseToggleReturn => {
    const [state, setState] = useState(initial);
    const toggle = useCallback(() => setState(state => !state), []);
    return [state, toggle]
}