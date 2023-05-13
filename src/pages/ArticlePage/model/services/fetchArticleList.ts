import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlePageLimit } from '../selectors/articlePageSelectors';

export interface FetchArticleListProps {
    page?: number;
}

export const fetchArticleList = createAsyncThunk<
Article[],
FetchArticleListProps,
    ThunkConfig<string>
    >(
        'articlePage/fetchArticleList',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;
            const { page = 1 } = props;
            const limit = getArticlePageLimit(getState());
            try {
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _page: page,
                        _limit: limit,
                    },
                });
                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
