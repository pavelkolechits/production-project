import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/deprecated/Text/Text';
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
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ? comments.map(((comment) => (
                <CommentCard
                    isLoading={isLoading}
                    comment={comment}
                    key={comment.id}
                />
            )))
                : <Text text={t('Комментарии отсутствуют')} />}
        </div>
    );
};
