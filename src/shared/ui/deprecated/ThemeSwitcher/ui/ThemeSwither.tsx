import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTheme, Theme } from 'app/providers/ThemeProvider';
import ThemeIcon from 'shared/assets/icons/theme.svg';
import { memo } from 'react';
import { Button, ThemeButton } from '../../../deprecated/Button/Button';
import { Icon } from '../../Icon/Icon';

interface ThemeSwitherProps {
  className?: string;
}

/**
 * Устарел, используем новый компанент из папки redesigned
 * @deprecated
 */

export const ThemeSwither = memo(({ className }: ThemeSwitherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            <Icon Svg={ThemeIcon} />
        </Button>
    );
});
