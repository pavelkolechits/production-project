import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useSelector } from 'react-redux';
import {
    getArticlePageOrder, getArticlePageSearch, getArticlePageSort, getArticlePageType, getArticlePageView,
} from 'pages/ArticlePage/model/selectors/articlePageSelectors';
import { Select } from 'shared/ui/Select/Select';
import { articlePageAction } from 'pages/ArticlePage/model/slice/articlePageSlice';
import { useCallback, useMemo } from 'react';
import { ArticleView, ArticleViewSelector } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/lib/types';
import { fetchArticleList } from 'pages/ArticlePage/model/services/fetchArticleList';
import { useDebounce } from 'shared/lib/helpers/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/TabItem/TabItem';
import cls from './ArticlePageFilter.module.scss';

interface ArticlePageFilterProps {
    className?: string
}

export const ArticlePageFilter = ({ className }: ArticlePageFilterProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlePageView);
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);
    const fetchData = useCallback(() => {
        dispatch(fetchArticleList({ replace: true }));
    }, [dispatch]);
    const debouncedFetchData = useDebounce(fetchData, 2000);
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
    const onChangeTabValue = useCallback((tab: TabItem) => {
        dispatch(articlePageAction.setType(tab.value as ArticleType));
        dispatch(articlePageAction.setPage(1));
        debouncedFetchData();
    }, [debouncedFetchData, dispatch]);
    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.IT,
            content: t('Айти'),
        },
        {
            value: ArticleType.ECONOMIC,
            content: t('Экономика'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука'),
        },
        {
            value: ArticleType.ALL,
            content: t('Все'),
        },
    ], [t]);
    return (
        <div className={classNames(cls.ArticlePageFilter, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    onChangeOrder={onChangeOrder}
                    onChangeSortField={onChangeSort}
                    order={order}
                    sort={sort}
                />
                <ArticleViewSelector view={view} onViewClick={onViewClick} />
            </div>
            <Card className={cls.search}>
                <Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
            </Card>
            <Tabs className={cls.tabs} onTabClick={onChangeTabValue} value={type} tabs={typeTabs} />

        </div>
    );
};
