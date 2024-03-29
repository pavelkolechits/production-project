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
import { toggleFeature } from 'shared/features';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}
export const PAGE_ID = 'PAGE_ID';

export const Page = ({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    useInfiniteScroll({
        triggerRef,
        // @ts-ignore
        wrapperRef: toggleFeature({
            name: 'isAppRedesigned',
            on: () => undefined,
            off: () => wrapperRef,
        }),
        callback: onScrollEnd,
    });
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
        <main
            ref={wrapperRef}
            className={classNames(
                toggleFeature({
                    name: 'isAppRedesigned',
                    on: () => cls.PageRedesigned,
                    off: () => cls.Page,
                }),
                {},
                [className],
            )}
            onScroll={onScrollHandler}
            id={PAGE_ID}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
};
