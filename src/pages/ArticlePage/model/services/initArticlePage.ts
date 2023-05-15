import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlePageInited, getArticlePageLimit } from '../selectors/articlePageSelectors';
import { articlePageAction } from '../slice/articlePageSlice';
import { fetchArticleList } from './fetchArticleList';

export interface FetchArticleListProps {
    page?: number;
}

export const initArticlePage = createAsyncThunk<
void,
void,
    ThunkConfig<string>
    >(
        'articlePage/initArticlePage',
        async (props, thunkApi) => {
            const {
                extra, rejectWithValue, getState, dispatch,
            } = thunkApi;
            const inited = getArticlePageInited(getState());
            if (inited) {
                dispatch(articlePageAction.initState());
                dispatch(fetchArticleList({
                    page: 1,
                }));
            }
        },
    );
