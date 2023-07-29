import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from 'shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/Text';
import { ToggleFeature } from 'shared/features';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { Text } from 'shared/ui/redesigned/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, item } = props;
    const content = (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <Card variant="normal" className={classNames(cls.NotificationItem, {}, [className])}>
                    <Text title={item.title} text={item.descripton} />
                </Card>
            )}
            off={(
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [className])}
                >
                    <TextDeprecated title={item.title} text={item.descripton} />
                </CardDeprecated>
            )}
        />

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
