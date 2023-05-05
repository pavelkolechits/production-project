import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetaisData } from 'entities/Article/model/selectors/articleDetail';
import { useDispatch } from 'react-redux';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
    >(
        'articleDetails/addCommentForArticle',
        async (text, thunkApi) => {
            const {
                extra, rejectWithValue, getState, dispatch,
            } = thunkApi;
            const userData = getUserAuthData(getState());
            const article = getArticleDetaisData(getState());
            if (!userData || !text || !article) {
                return rejectWithValue('no data');
            }
            try {
                const response = await extra.api.post<Comment>('/comments', {
                    userId: userData.id,
                    text,
                    articleId: article.id,
                });
                dispatch(fetchCommentsByArticleId(article.id));
                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
