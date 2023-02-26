import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useState } from 'react';
import { ThemeSwither } from 'shared/ui/ThemeSwitcher';
import { LanguageSwitcher } from 'shared/ui/LanguageSwither';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/mainIcon.svg';
import AboutIcon from 'shared/assets/icons/aboutIcon.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };
    const { t } = useTranslation();
    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <Button
                theme={ThemeButton.BACKGROUND_INVERTED}
                className={cls.collapseBtn}
                data-testid="sidebar-toggle"
                onClick={onToggle}
                square
                size={SizeButton.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>

                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.item}
                    to={RoutePath.main}
                >
                    <MainIcon className={cls.icon} />
                    <span className={cls.link}>{t('Главная')}</span>

                </AppLink>

                <AppLink
                    className={cls.item}
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.about}
                >
                    <AboutIcon className={cls.icon} />
                    <span className={cls.link}>{t('О сайте')}</span>

                </AppLink>

            </div>
            <div className={cls.switchers}>
                <ThemeSwither />
                <LanguageSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    );
};
