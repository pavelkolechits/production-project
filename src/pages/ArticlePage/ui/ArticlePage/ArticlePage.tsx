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
import {
    getArticlePageError,
    getArticlePageHasMore,
    getArticlePageIsLoading,
    getArticlePageNum,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlePage.module.scss';
import { articlePageAction, articlePageReducer, getArticles } from '../../model/slice/articlePageSlice';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage';

interface ArticlePageProps {
    className?: string
}
const reducers: ReducerList = {
    articlePage: articlePageReducer,
};

const ArticlePage = ({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const view = useSelector(getArticlePageView);
    const onViewClick = useCallback((view: ArticleView) => {
        dispatch(articlePageAction.setView(view));
    }, [dispatch]);

    useEffect(() => {
        dispatch(articlePageAction.initState());
        dispatch(fetchArticleList({
            page: 1,
        }));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlePage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onViewClick} />
                <ArticleList isLoading={isLoading} view={view} articles={articles} />
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlePage);
