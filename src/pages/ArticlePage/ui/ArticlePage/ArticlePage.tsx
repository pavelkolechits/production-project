import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback, useEffect } from 'react';
import { fetchArticleList } from 'pages/ArticlePage/model/services/fetchArticleList';
import { useSelector } from 'react-redux';
import { Page } from 'shared/ui/Page/Page';
import { initArticlePage } from 'pages/ArticlePage/model/services/initArticlePage';
import { useSearchParams } from 'react-router-dom';
import {
    getArticlePageError,
    getArticlePageHasMore,
    getArticlePageInited,
    getArticlePageIsLoading,
    getArticlePageNum,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlePage.module.scss';
import { articlePageAction, articlePageReducer, getArticles } from '../../model/slice/articlePageSlice';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage';
import { ArticlePageFilter } from '../ArticlePageFilter/ArticlePageFilter';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

interface ArticlePageProps {
    className?: string
}
const reducers: ReducerList = {
    articlePage: articlePageReducer,
};

const ArticlePage = ({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch();
    const inited = useSelector(getArticlePageInited);
    const [serchParams] = useSearchParams();

    useEffect(() => {
        dispatch(initArticlePage(serchParams));
    }, [dispatch, inited, serchParams]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlePage, {}, [className])}>
                <ArticlePageFilter />
                <ArticleInfiniteList />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlePage);
