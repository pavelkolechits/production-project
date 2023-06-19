import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

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
