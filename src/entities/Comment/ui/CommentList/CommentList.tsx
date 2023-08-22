import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ToggleFeature } from 'shared/features';
import { Text } from 'shared/ui/redesigned/Text';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { Text as TaxtDeprecated } from 'shared/ui/deprecated/Text/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = (props: CommentListProps) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();
    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }
    return (
        <VStack gap="8" max className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ? comments.map(((comment) => (
                <CommentCard
                    isLoading={isLoading}
                    comment={comment}
                    key={comment.id}
                />
            )))
                : (
                    <ToggleFeature
                        name="isAppRedesigned"
                        on={<Text text={t('Комментарии отсутствуют')} />}
                        off={(
                            <TaxtDeprecated text={t('Комментарии отсутствуют')} />
                        )}
                    />
                )}
        </VStack>
    );
};
