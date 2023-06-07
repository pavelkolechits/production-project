import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    articleDetailsCommentReducer,
    getArticleDetailsComments,
} from 'pages/ArticleDetailsPage/model/slice/aticleDetailsCommentSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/comments';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddNewComment } from 'features/AddNewComment';
import {
    addCommentForArticle,
} from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { Page } from 'shared/ui/Page/Page';
import {
    articleDetailsPageRecomendationReducers, getArticleRecomendation,
} from 'pages/ArticleDetailsPage/model/slice/articleDetailsPageRecomendationSlice';
import { getArticleRecomendationIsLoading } from 'pages/ArticleDetailsPage/model/selectors/recomendation';
import {
    fetchArticleRecomendation,
} from 'pages/ArticleDetailsPage/model/services/fetchArticleRecomendation/fetchArticleRecomendation';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArticleRecomendationList } from 'features/ArticleRecomendationList';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentReducer,
    articleDetailsRecomendation: articleDetailsPageRecomendationReducers,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text title={t('Статья не найдена')} />
            </Page>
        );
    }
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap="16">
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecomendationList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};
export default memo(ArticleDetailsPage);
