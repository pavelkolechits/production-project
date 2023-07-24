import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

/**
 * Устарел, используем новый компанент из папки redesigned
 * @deprecated
 */

export const Overlay = (props: OverlayProps) => {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
    );
};
