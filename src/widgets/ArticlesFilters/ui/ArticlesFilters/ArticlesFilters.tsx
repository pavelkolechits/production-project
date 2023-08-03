import { Card } from 'shared/ui/redesigned/Card/Card';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { Tabs } from 'shared/ui/deprecated/TabItem/TabItem';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/lib/types';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/redesigned/Input/Input';
import { Icon } from 'shared/ui/redesigned/Icon/Icon';
import searchIcon from '../../../../shared/assets/icons/searchIcon.svg';
import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSortField: (newField: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    type: ArticleType;
    onChangeType: (type: ArticleType) => void;
    search: string;
    onChangeSearch: (search: string) => void
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
    const {
        className, sort, order, onChangeOrder, onChangeSortField, onChangeType, type, search, onChangeSearch,
    } = props;
    const { t } = useTranslation();
    return (
        <Card className={classNames(cls.ArticlesFilters, {}, [className])}>
            <VStack gap="32">
                <Input
                    addonLeft={<Icon width={15} height={15} Svg={searchIcon} />}
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Поиск')}
                />
                <ArticleTypeTabs
                    className={cls.tabs}
                    onChangeType={onChangeType}
                    value={type}
                />
                <ArticleSortSelector
                    onChangeOrder={onChangeOrder}
                    onChangeSortField={onChangeSortField}
                    order={order}
                    sort={sort}
                />

            </VStack>
        </Card>
    );
};
