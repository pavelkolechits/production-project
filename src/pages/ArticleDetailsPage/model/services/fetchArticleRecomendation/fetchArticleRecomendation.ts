import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { addQueryParams } from 'shared/lib/addQueryParams/addQueryParams';
import { ArticleType } from 'entities/Article/model/types/article';

export const fetchArticleRecomendation = createAsyncThunk<
Article[],
void,
    ThunkConfig<string>
    >(
        'articleDetailsPage/fetchArticleRecomendation',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;
            try {
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _limit: 4,
                    },
                });
                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
