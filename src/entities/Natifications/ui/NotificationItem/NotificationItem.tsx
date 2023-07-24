import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Card, CardTheme } from 'shared/ui/deprecated/Card/Card';
import { Text } from 'shared/ui/deprecated/Text/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, item } = props;
    const content = (
        <Card theme={CardTheme.OUTLINED} className={classNames(cls.NotificationItem, {}, [className])}>
            <Text title={item.title} text={item.descripton} />
        </Card>
    );
    if (item.href) {
        return (
            <a className={cls.link} href={item.href} target="_blank" rel="noreferrer">
                {content}
            </a>
        );
    }

    return content;
};
