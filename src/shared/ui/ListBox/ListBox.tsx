import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection
}
const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopRight,
    'top right': cls.optionsTopRight,
};

export const ListBox = (props: ListBoxProps) => {
    const {
        className, items, onChange, value, defaultValue, readonly, direction = 'bottom right',
    } = props;

    return (
        <HListbox
            disabled={readonly}
            as="div"
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <HListbox.Button disabled={readonly} className={cls.trigger}>
                <Button disabled={readonly}>
                    {value ?? defaultValue}
                </Button>

            </HListbox.Button>
            <HListbox.Options className={classNames(cls.options, {}, [mapDirectionClass[direction]])}>
                {items?.map((item) => (
                    <HListbox.Option
                        as={Fragment}
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {({ active, selected }) => (
                            <li
                                className={
                                    classNames(
                                        cls.item,
                                        { [cls.active]: active, [cls.disabled]: item.disabled },
                                        [],
                                    )
                                }
                            >
                                {selected && '>'}
                                {item.content}
                            </li>
                        )}
                    </HListbox.Option>
                ))}
            </HListbox.Options>
        </HListbox>
    );
};
