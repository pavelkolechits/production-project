import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useState } from 'react';
import { ThemeSwither } from 'shared/ui/ThemeSwitcher';
import { LanguageSwitcher } from 'shared/ui/LanguageSwither';
import { Button } from 'shared/ui/Button/Button';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };
    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            {' '}
            <Button data-testid="sidebar-toggle" onClick={onToggle}>toggle</Button>
            <div className={cls.switchers}>
                <ThemeSwither />
                <LanguageSwitcher className={cls.lang} />
            </div>
        </div>
    );
};