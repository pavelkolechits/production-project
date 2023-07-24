import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { AddNewComment } from 'features/AddNewComment';
import { Text } from 'shared/ui/deprecated/Text/Text';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { getArticleDetailsComments } from '../../model/slice/aticleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = ({ className, id }: ArticleDetailsCommentsProps) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);
    const { t } = useTranslation();
    const comments = useSelector(getArticleDetailsComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);
    return (
        <div className={classNames('', {}, [className])}>
            <Text title={t('Комментарий')} />
            <AddNewComment onSendComment={onSendComment} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </div>
    );
};
