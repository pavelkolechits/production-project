import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from 'shared/ui/deprecated/AppLink/AppLink';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { ToggleFeature } from 'shared/features';
import { AppLink } from 'shared/ui/redesigned/AppLink/AppLink';
import { Icon } from 'shared/ui/redesigned/Icon/Icon';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);
    if (!isAuth && item.authOnly) {
        return null;
    }
    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <div className={classNames(cls.SidebarItem, { [cls.collapsedRedesigned]: collapsed }, [])}>
                    <AppLink
                        activeClassName={cls.active}
                        variant="primary"
                        className={cls.itemRedesigned}
                        to={item.path}
                    >
                        <Icon Svg={item.Icon} />
                        <span className={cls.link}>{t(item.text)}</span>
                    </AppLink>
                </div>
            )}
            off={(
                <div className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed }, [])}>
                    <AppLinkDeprecated
                        theme={AppLinkTheme.SECONDARY}
                        className={cls.item}
                        to={item.path}
                    >
                        <item.Icon className={cls.icon} />
                        <span className={cls.link}>{t(item.text)}</span>
                    </AppLinkDeprecated>
                </div>
            )}
        />

    );
});
