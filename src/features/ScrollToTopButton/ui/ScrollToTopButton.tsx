import { Icon } from 'shared/ui/redesigned/Icon/Icon';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ScrollToTopButton.module.scss';
import TopArrow from '../../../shared/assets/icons/ScrollToTop.svg';

interface ScrollToTopButtonProps {
    className?: string
}

export const ScrollToTopButton = ({ className }: ScrollToTopButtonProps) => {
    const onClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <Icon
            Svg={TopArrow}
            onClick={onClick}
            clickable
            width={32}
            height={32}
            className={classNames('', {}, [className])}
        />

    );
};
