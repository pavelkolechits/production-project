import { ArticlesFilters } from 'widgets/ArticlesFilters';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './FilterContainer.module.scss';
import { useArticleFilters } from '../ArticlePage/lib/hoocs/useArticleFilters';

interface FilterContainerProps {
    className?: string
}

export const FilterContainer = ({ className }: FilterContainerProps) => {
    const {
        search, sort, onChangeOrder, onChangeSearch, onChangeSort, onChangeType, order, type,
    } = useArticleFilters();
    return (
        <ArticlesFilters
            search={search}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSortField={onChangeSort}
            onChangeType={onChangeType}
            onChangeSearch={onChangeSearch}
            order={order}
            type={type}
        />
    );
};
