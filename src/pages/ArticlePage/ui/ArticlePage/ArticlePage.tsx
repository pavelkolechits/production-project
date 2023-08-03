import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import { ToggleFeature } from 'shared/features';
import { StickyContentLayout } from 'shared/layouts';
import { initArticlePage } from '../../model/services/initArticlePage';
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
import { FilterContainer } from '../FiltersContainer/FilterContainer';
import { ArticlePageFilter } from '../ArticlePageFilter/ArticlePageFilter';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ViewSelectorsContainer } from '../ViewSelectorsContainer/ViewSelectorsContainer';

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

    const content = (
        <ToggleFeature
            name="isAppRedesigned"
            off={(
                <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlePage, {}, [className])}>
                    <ArticlePageFilter />
                    <ArticleInfiniteList />
                </Page>
            )}
            on={(
                <StickyContentLayout
                    left={<ViewSelectorsContainer />}
                    right={<FilterContainer />}
                    content={(
                        <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlePage, {}, [className])}>
                            <ArticleInfiniteList />
                        </Page>
                    )}
                />
            )}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlePage);
