import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Avatar } from 'shared/ui/deprecated/Avatar/Avatar';
import { Text } from 'shared/ui/deprecated/Text/Text';
import { Skeleton } from 'shared/ui/deprecated/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/deprecated/AppLink/AppLink';
import { getRouteProfile } from 'shared/consts/router';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = ({ className, comment, isLoading }: CommentCardProps) => {
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} borderRadius="50%" />
                    <Skeleton className={cls.username} height={16} width={100} />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </div>
        );
    }
    if (!comment) {
        return null;
    }
    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={getRouteProfile(comment?.user.id)} className={cls.header}>
                {comment?.user.avatar
                    ? (
                        <Avatar
                            src={comment?.user.avatar}
                            alt=""
                            size={30}
                        />
                    )
                    : null }
                <Text className={cls.username} text={comment?.user.username} />
            </AppLink>
            <Text className={cls.text} text={comment?.text} />
        </div>
    );
};
