/* eslint-disable i18next/no-literal-string */
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

interface DropdownItem {
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
    content?: ReactNode;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger?: ReactNode;
    direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;
    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [mapDirectionClass[direction]])}>
                {items.map((item) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            disabled={item.disabled}
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, { [popupCls.active]: active }, [])}
                        >
                            {item.content}
                        </button>
                    );
                    if (item.href) {
                        return (
                            <Menu.Item disabled={item.disabled} to={item.href} as={AppLink}>
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item disabled={item.disabled} as={Fragment}>
                            {content}
                        </Menu.Item>
                    );
                })}

            </Menu.Items>
        </Menu>
    );
};
