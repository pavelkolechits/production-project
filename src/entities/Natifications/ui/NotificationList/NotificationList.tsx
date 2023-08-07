import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { Skeleton as SkeletonDeprecated } from 'shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from 'shared/ui/redesigned/Skeleton/Skeleton';
import { toggleFeature } from 'shared/features';
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
    const Skeleton = (
        toggleFeature(
            {
                name: 'isAppRedesigned',
                off: () => SkeletonDeprecated,
                on: () => SkeletonRedesigned,
            },
        ));

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
