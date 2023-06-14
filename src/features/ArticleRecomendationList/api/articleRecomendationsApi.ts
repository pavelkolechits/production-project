import { Article } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';

export const recomendationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArtcleRecomendationList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const useArticleRecomendationList = recomendationApi.useGetArtcleRecomendationListQuery;
