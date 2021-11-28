import { useCallback, useState } from 'react';

type UseToggleReturn = [boolean, () => void];

export const useToggle = (initial = false): UseToggleReturn => {
    const [state, setState] = useState(initial);
    const toggle = useCallback(() => setState(state => !state), []);
    return [state, toggle]
}