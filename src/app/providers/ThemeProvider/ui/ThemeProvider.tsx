import {
    ThemeContext,
    Theme,
    LOCAL_STORAGE_THEME_KEY,
} from 'app/providers/ThemeProvider/lib/ThemeContext';
import {
    FC, ReactNode, useEffect, useMemo, useState,
} from 'react';

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;
interface ThemeProviderProps{
    children: ReactNode;
    initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.LIGHT);
    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};
