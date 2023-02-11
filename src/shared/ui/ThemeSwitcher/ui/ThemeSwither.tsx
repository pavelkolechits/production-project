import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTheme, Theme } from 'app/providers/ThemeProvider';
import { Button } from 'shared/ui/Button/Button';
import LightIcon from '../../../assets/icons/theme-light.svg';
import DarkIcon from '../../../assets/icons/theme-dark.svg';

interface ThemeSwitherProps {
  className?: string;
}

export const ThemeSwither = ({ className }: ThemeSwitherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            className={classNames( '', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
};
