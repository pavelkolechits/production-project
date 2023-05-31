/* eslint-disable i18next/no-literal-string */
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss';
import { AppLink } from '../AppLink/AppLink';

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

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopRight,
    'top right': cls.optionsTopRight,
};
export const Dropdown = (props: DropdownProps) => {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;
    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [mapDirectionClass[direction]])}>
                {items.map((item) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            disabled={item.disabled}
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, { [cls.active]: active }, [])}
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
