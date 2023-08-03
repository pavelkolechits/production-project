import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/helpers/hooks/useDebounce/useDebounce';
import { SortOrder } from 'shared/lib/types';
import { TabItem } from 'shared/ui/deprecated/TabItem/TabItem';
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlePageView,
} from '../../../../model/selectors/articlePageSelectors';
import { articlePageAction } from '../../../../model/slice/articlePageSlice';
import { fetchArticleList } from '../../../../model/services/fetchArticleList';

export function useArticleFilters() {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlePageView);
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);
    const fetchData = useCallback(() => {
        dispatch(fetchArticleList({ replace: true }));
    }, [dispatch]);
    const debouncedFetchData = useDebounce(fetchData, 500);
    const onViewClick = useCallback((view: ArticleView) => {
        dispatch(articlePageAction.setView(view));
        dispatch(articlePageAction.setPage(1));
    }, [dispatch]);
    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlePageAction.setSort(newSort));
        dispatch(articlePageAction.setPage(1));
        debouncedFetchData();
    }, [debouncedFetchData, dispatch]);
    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlePageAction.setOrder(newOrder));
        dispatch(articlePageAction.setPage(1));
        debouncedFetchData();
    }, [debouncedFetchData, dispatch]);
    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageAction.setSearch(search));
        dispatch(articlePageAction.setPage(1));
        debouncedFetchData();
    }, [debouncedFetchData, dispatch]);
    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlePageAction.setType(value as ArticleType));
        dispatch(articlePageAction.setPage(1));
        debouncedFetchData();
    }, [debouncedFetchData, dispatch]);
    return {
        view, search, sort, order, type, onChangeOrder, onChangeSearch, onChangeSort, onChangeType, onViewClick,
    };
}
