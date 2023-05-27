import { classNames } from 'shared/lib/helpers/classNames/classNames';
import {
    MutableRefObject, ReactNode, UIEvent, useEffect, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/helpers/hooks/useInfinityScroll/useInfinityScroll';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { getScrollPosition, getScrollPositionPath, scrollPositionSaveAction } from 'features/ScrollPositionSave';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/helpers/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = ({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { pathname } = useLocation();
    useInfiniteScroll({ wrapperRef, triggerRef, callback: onScrollEnd });
    const dispatch = useAppDispatch();
    const scrollPosition = useSelector((state: StateSchema) => getScrollPositionPath(state, pathname));
    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });
    const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollPositionSaveAction.setScrollPsition(
                { path: pathname, position: e.currentTarget.scrollTop },
            ),
        );
    }, 500);
    return (
        <section
            onScroll={onScrollHandler}
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </section>
    );
};
