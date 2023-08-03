import { ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './TabItem.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode
}

interface TabItemProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs = (props: TabItemProps) => {
    const {
        className, tabs, onTabClick, value, direction = 'row',
    } = props;
    const onClickHandler = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab);
        };
    }, [onTabClick]);
    return (
        <Flex align="start" gap="8" direction={direction} className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    onClick={onClickHandler(tab)}
                    variant={tab.value === value ? 'light' : 'normal'}
                    key={tab.value}
                    className={cls.tab}
                    border="24"
                >
                    {tab.content}
                </Card>
            ))}
        </Flex>
    );
};
