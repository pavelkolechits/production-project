import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { ThemeSwither } from 'shared/ui/deprecated/ThemeSwitcher';
import { LanguageSwitcher } from 'shared/ui/deprecated/LanguageSwither';
import { Button, SizeButton, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { useSelector } from 'react-redux';
import { VStack } from 'shared/ui/deprecated/Stack/VStack/VStack';
import { ToggleFeature } from 'shared/features';
import { AppLogo } from 'shared/ui/redesigned/AppLogo/AppLogo';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

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
                        <ThemeSwither />
                        <LanguageSwitcher short={collapsed} className={cls.lang} />
                    </div>
                </aside>
            )}
            on={(
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [
                        className,
                    ])}
                >
                    <AppLogo className={cls.AppLogo} />
                    {/* <VStack gap="8" className={cls.items}>
                        {itemsList}
                    </VStack> */}
                </aside>
            )}
        />
    );
});
