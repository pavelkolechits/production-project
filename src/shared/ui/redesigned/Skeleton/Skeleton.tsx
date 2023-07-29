import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { CSSProperties } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    borderRadius?: string;
}

/**
 * Устарел, используем новый компанент из папки redesigned
 * @deprecated
 */

export const Skeleton = (props: SkeletonProps) => {
    const {
        className, height, width, borderRadius,
    } = props;
    const style: CSSProperties = {
        width,
        height,
        borderRadius,
    };
    return (
        <div style={style} className={classNames(cls.Skeleton, {}, [className])} />
    );
};
