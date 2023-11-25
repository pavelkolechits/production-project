import { ReactElement } from 'react';
import { AppRoutes } from 'shared/consts/router';
import { useRouteChange } from 'shared/lib/router/useRouteChange';
import { ScrollToolbar } from 'widgets/ScrollToolbar';

export function useAppToolbar() {
    const appRoute = useRouteChange();

    // eslint-disable-next-line no-undef
    
    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        [AppRoutes.MAIN]: <div>Main</div>,
    };

    return toolbarByAppRoute[appRoute];
}
