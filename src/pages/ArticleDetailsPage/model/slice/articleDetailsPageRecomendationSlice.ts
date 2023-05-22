import {
    EntityState, PayloadAction, createEntityAdapter, createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { Article } from 'entities/Article';
import { ArticleDetailsCommentsSchema } from '../type/articleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsRecomendationSchema } from '../type/articleDetailsRecomendationSchema';
import { fetchArticleRecomendation } from '../services/fetchArticleRecomendation/fetchArticleRecomendation';

const recomendationAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecomendation = recomendationAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsRecomendation || recomendationAdapter.getInitialState(),
);

const articleDetailsPageRecomendationSlice = createSlice({
    name: 'articleDetailsPageRecomendationSlice',
    initialState: recomendationAdapter.getInitialState<ArticleDetailsRecomendationSchema>({
        entities: {},
        ids: [],
        isLoading: false,
        error: undefined,
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecomendation.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecomendation.fulfilled, (state, action) => {
                state.isLoading = false;
                recomendationAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecomendation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const {
    actions: articleDetailsPageRecomendationActions,
    reducer: articleDetailsPageRecomendationReducers,
} = articleDetailsPageRecomendationSlice;
