import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { SortOrder } from 'shared/lib/types';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { getArticlePageInited, getArticlePageLimit } from '../selectors/articlePageSelectors';
import { articlePageAction } from '../slice/articlePageSlice';
import { fetchArticleList } from './fetchArticleList';

export interface FetchArticleListProps {
    page?: number;
}

export const initArticlePage = createAsyncThunk<
void,
URLSearchParams,
    ThunkConfig<string>
    >(
        'articlePage/initArticlePage',
        async (searchParams, thunkApi) => {
            const {
                extra, rejectWithValue, getState, dispatch,
            } = thunkApi;
            const inited = getArticlePageInited(getState());
            if (!inited) {
                const orderFromUrl = searchParams.get('order') as SortOrder;
                const sortFromUrl = searchParams.get('sort') as ArticleSortField;
                const searchFromUrl = searchParams.get('search');
                if (orderFromUrl) {
                    dispatch(articlePageAction.setOrder(orderFromUrl));
                }
                if (sortFromUrl) {
                    dispatch(articlePageAction.setSort(sortFromUrl));
                }
                if (searchFromUrl) {
                    dispatch(articlePageAction.setSearch(searchFromUrl));
                }
                dispatch(articlePageAction.initState());
                dispatch(fetchArticleList({
                }));
            }
        },
    );
