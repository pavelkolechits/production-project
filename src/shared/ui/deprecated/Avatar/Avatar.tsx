import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    size?: number;
    src?: string;
    alt?: string
}
/**
 * Устарел, используем новый компанент из папки redesigned
 * @deprecated
 */

export const Avatar = (props: AvatarProps) => {
    const {
        className, size, src, alt,
    } = props;
    const styles = useMemo<CSSProperties>(() => (
        {
            width: size || 100,
            height: size || 100,
        }
    ), [size]);

    return (
        <img
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, {}, [className])}
            src={src}
        />
    );
};
