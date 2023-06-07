import { rtkApi } from 'shared/api/rtkApi';

export const recomendationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArtcleRecomendationList: build.query({
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
