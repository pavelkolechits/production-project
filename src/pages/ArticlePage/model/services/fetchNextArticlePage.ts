import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
    getArticlePageHasMore,
    getArticlePageIsLoading,
    getArticlePageLimit,
    getArticlePageNum,
} from '../selectors/articlePageSelectors';
import { articlePageAction } from '../slice/articlePageSlice';
import { fetchArticleList } from './fetchArticleList';

export const fetchNextArticlePage = createAsyncThunk<
void,
void,
    ThunkConfig<string>
    >(
        'articlePage/fetchNextArticlePage',
        async (_, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const isLoading = getArticlePageIsLoading(getState());
            const hasMore = getArticlePageHasMore(getState());
            const page = getArticlePageNum(getState());
            if (hasMore && !isLoading) {
                dispatch(articlePageAction.setPage(page + 1));
                dispatch(fetchArticleList({
                    page: page + 1,
                }));
            }
        },
    );
