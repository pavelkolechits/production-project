import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ScrollToTopButton } from 'features/ScrollToTopButton';
import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
    className?: string
}

export const ScrollToolbar = ({ className }: ScrollToolbarProps) => {
    return (
        <VStack max justify="center" align="center" className={classNames(cls.ScrollToolbar, {}, [className])}>
            <ScrollToTopButton />
        </VStack>
    );
};
