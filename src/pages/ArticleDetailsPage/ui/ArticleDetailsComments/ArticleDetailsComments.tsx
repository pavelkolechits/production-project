import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { AddNewComment } from 'features/AddNewComment';
import { Text as TextDeprecated, TextSize } from 'shared/ui/deprecated/Text/Text';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { Suspense, useCallback, useEffect } from 'react';
import { ToggleFeature } from 'shared/features';
import { Loader } from 'shared/ui/deprecated/Loader/Loader';
import { Text } from 'shared/ui/redesigned/Text';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { getArticleDetailsComments } from '../../model/slice/aticleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const comments = useSelector(getArticleDetailsComments.selectAll);
    console.log(comments, '1');
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );
    console.log(comments, '2');
    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            <ToggleFeature
                name="isAppRedesigned"
                on={<Text size="l" title={t('Комментарии')} />}
                off={(
                    <TextDeprecated
                        size={TextSize.L}
                        title={t('Комментарии')}
                    />
                )}
            />
            <Suspense fallback={<Loader />}>
                <AddNewComment onSendComment={onSendComment} />
            </Suspense>
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
    );
};
