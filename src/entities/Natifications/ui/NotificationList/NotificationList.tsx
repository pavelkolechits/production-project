import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string
}

export const NotificationList = ({ className }: NotificationListProps) => {
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 10000,
    });
    if (isLoading) {
        return (
            <VStack gap="16" className={classNames(cls.NotificationList, {}, [className])}>
                <Skeleton width="100%" borderRadius="8xp" height="80px" />
                <Skeleton width="100%" borderRadius="8xp" height="80px" />
                <Skeleton width="100%" borderRadius="8xp" height="80px" />
            </VStack>
        );
    }
    return (
        <VStack gap="16" className={classNames(cls.NotificationList, {}, [className])}>
            {data?.map((item) => <NotificationItem key={item.id} item={item} />)}
        </VStack>
    );
};
