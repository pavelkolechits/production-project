import { EntityState } from '@reduxjs/toolkit';
import {
    ArticleSortField, ArticleType, ArticleView, Article,
} from 'entities/Article';
import { SortOrder } from 'shared/lib/types';

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
    page: number;
    limit: number;
    hasMore: boolean;
    _inited: boolean;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;
}
