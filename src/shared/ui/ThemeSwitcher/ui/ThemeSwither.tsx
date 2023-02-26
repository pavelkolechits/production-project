import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTheme, Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import LightIcon from 'shared/assets/icons/themeLight.svg';
import DarkIcon from 'shared/assets/icons/themeDark.svg';

interface ThemeSwitherProps {
  className?: string;
}

export const ThemeSwither = ({ className }: ThemeSwitherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
};
