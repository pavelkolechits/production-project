import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { RatingCard } from 'entities/Rating';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useCallback } from 'react';
import cls from './ArticleRating.module.scss';
import { useGetArticleRating, useRateArticle } from '../model/api/articleRatingApi';

interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

export const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetArticleRating({ articleId, userId: userData?.id ?? '' });
    const [rateArticleMutation] = useRateArticle();
    const rating = data?.[0];
    const onRateArticleHandler = useCallback((starsNumber: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '', articleId, rate: starsNumber, feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);
    const onAccept = useCallback((starsNumber: number, feedback?: string) => {
        onRateArticleHandler(starsNumber, feedback);
    }, [onRateArticleHandler]);
    const onCancel = useCallback((starsNumber: number) => {
        onRateArticleHandler(starsNumber);
    }, [onRateArticleHandler]);
    if (isLoading) {
        return <Skeleton width="100%" height="120px" />;
    }
    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={classNames('', {}, [className])}
            title={t('Как вам статья?')}
            hasFeedback
            feedbackTitle={t('Оставьте отзыв о статье')}
        />
    );
};
