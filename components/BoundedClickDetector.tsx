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