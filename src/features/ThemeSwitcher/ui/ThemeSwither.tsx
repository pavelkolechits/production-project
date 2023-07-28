import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import ThemeIcon from 'shared/assets/icons/theme.svg';
import { memo } from 'react';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { Icon } from 'shared/ui/redesigned/Icon/Icon';

interface ThemeSwitherProps {
  className?: string;
}

export const ThemeSwither = memo(({ className }: ThemeSwitherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            variant="clear"
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            <Icon Svg={ThemeIcon} />
        </Button>
    );
});
