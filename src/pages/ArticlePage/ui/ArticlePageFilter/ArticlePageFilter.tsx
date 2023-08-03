import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import {
    ArticleView, ArticleViewSelector, ArticleType, ArticleSortField,
} from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/deprecated/Card/Card';
import { Input } from 'shared/ui/deprecated/Input/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from 'shared/lib/types';
import { useDebounce } from 'shared/lib/helpers/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/deprecated/TabItem/TabItem';
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/ArticleTypeTabs';
import { fetchArticleList } from '../../model/services/fetchArticleList';
import { articlePageAction } from '../../model/slice/articlePageSlice';
import {
    getArticlePageOrder, getArticlePageSearch, getArticlePageSort, getArticlePageType, getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlePageFilter.module.scss';
import { useArticleFilters } from '../ArticlePage/lib/hoocs/useArticleFilters';

interface ArticlePageFilterProps {
    className?: string
}

export const ArticlePageFilter = ({ className }: ArticlePageFilterProps) => {
    const { t } = useTranslation();
    const {
        search, sort, view, onChangeOrder, onChangeSearch, onChangeSort, onChangeType, onViewClick, order, type,
    } = useArticleFilters();
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
            <ArticleTypeTabs className={cls.tabs} onChangeType={onChangeType} value={type} />

        </div>
    );
};
