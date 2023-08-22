import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Avatar as AvatarDeprecated } from 'shared/ui/deprecated/Avatar/Avatar';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/Text';
import { Skeleton as SkeletonDeprecated } from 'shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from 'shared/ui/redesigned/Skeleton/Skeleton';
import { AppLink as AppLinkDeprecated } from 'shared/ui/deprecated/AppLink/AppLink';
import { ToggleFeature, toggleFeature } from 'shared/features';
import { getRouteProfile } from 'shared/consts/router';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { AppLink } from 'shared/ui/redesigned/AppLink/AppLink';
import { Text } from 'shared/ui/redesigned/Text';
import { Avatar } from 'shared/ui/redesigned/Avatar/Avatar';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = ({ className, comment, isLoading }: CommentCardProps) => {
    const Skeleton = toggleFeature(
        {
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        },
    );
    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} borderRadius="50%" />
                    <Skeleton
                        height={16}
                        width={100}
                        className={cls.username}
                    />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        );
    }
    if (!comment) {
        return null;
    }
    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <Card max padding="16" border="16">
                    <VStack max gap="8">
                        <AppLink to={getRouteProfile(comment?.user.id)}>
                            <HStack gap="8">
                                {comment.user.avatar ? (
                                    <Avatar
                                        size={30}
                                        src={comment.user.avatar}
                                    />
                                ) : null}
                                <Text text={comment.user.username} bold />
                            </HStack>
                        </AppLink>
                        <Text text={comment?.text} />
                    </VStack>
                </Card>

            )}
            off={(
                <VStack className={classNames(cls.CommentCard, {}, [className])}>
                    <AppLinkDeprecated to={getRouteProfile(comment?.user.id)} className={cls.header}>
                        {comment?.user.avatar
                            ? (
                                <AvatarDeprecated
                                    src={comment?.user.avatar}
                                    alt=""
                                    size={30}
                                />
                            )
                            : null }
                        <TextDeprecated className={cls.username} text={comment?.user.username} />
                    </AppLinkDeprecated>
                    <TextDeprecated className={cls.text} text={comment?.text} />
                </VStack>
            )}
        />

    );
};
