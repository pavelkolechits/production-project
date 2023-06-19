import {
    ThemeContext,
    Theme,
    LOCAL_STORAGE_THEME_KEY,
} from 'app/providers/ThemeProvider/lib/ThemeContext';
import {
    FC, ReactNode, useMemo, useState,
} from 'react';

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;
interface ThemeProviderProps{
    children: ReactNode;
    initialTheme?: Theme;
}
export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};
