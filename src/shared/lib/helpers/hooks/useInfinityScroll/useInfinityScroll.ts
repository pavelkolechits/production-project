import { MutableRefObject, useEffect, useRef } from 'react';

interface UseInfinityScrollProps {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLDivElement>;
    wrapperRef: MutableRefObject<HTMLDivElement>
}

export function useInfinityScroll({ callback, triggerRef, wrapperRef }:UseInfinityScrollProps) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        if (callback) {
            const options = {
                root: wrapperRef.current,
                rootMargin: '0px',
                threshold: 1.0,
            };
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);
            observer.observe(triggerRef.current);
        }
        return () => {
            if (observer) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef.current);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
