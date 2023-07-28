import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { ThemeSwither as ThemeSwitcherDeprecated } from 'shared/ui/deprecated/ThemeSwitcher';
import { LanguageSwitcher as LanguageSwitcherDeprecated } from 'shared/ui/deprecated/LanguageSwither';
import { Button, SizeButton, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { useSelector } from 'react-redux';
import { VStack } from 'shared/ui/deprecated/Stack/VStack/VStack';
import { ToggleFeature } from 'shared/features';
import { AppLogo } from 'shared/ui/redesigned/AppLogo/AppLogo';
import { Icon } from 'shared/ui/redesigned/Icon/Icon';
import ArrowIcon from 'shared/assets/icons/Union.svg';
import { ThemeSwither } from 'features/ThemeSwitcher';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { LanguageSwitcher } from 'features/LanguageSwither';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemList = useSelector(getSidebarItems);
    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };
    const itemsList = useMemo(() => sidebarItemList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, sidebarItemList]);

    return (
        <ToggleFeature
            name="isAppRedesigned"
            off={(
                <aside
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
                    <VStack gap="8" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <div className={cls.switchers}>
                        <ThemeSwitcherDeprecated />
                        <LanguageSwitcherDeprecated short={collapsed} className={cls.lang} />
                    </div>
                </aside>
            )}
            on={(
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.SidebarRedesigned, { [cls.collapsedRedesigned]: collapsed }, [
                        className,
                    ])}
                >
                    <AppLogo size={collapsed ? 30 : 50} className={cls.AppLogo} />
                    <VStack gap="8" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <Icon
                        width={16}
                        height={16}
                        Svg={ArrowIcon}
                        className={cls.collapseBtn}
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        clickable
                    />
                    <div className={cls.switchers}>
                        <ThemeSwither />
                        <LanguageSwitcher className={cls.lang} />
                    </div>
                </aside>
            )}
        />
    );
});
