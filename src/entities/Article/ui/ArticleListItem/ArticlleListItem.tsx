import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Text } from 'shared/ui/deprecated/Text/Text';
import { Icon } from 'shared/ui/deprecated/Icon/Icon';
import { Card } from 'shared/ui/deprecated/Card/Card';
import { useHover } from 'shared/lib/helpers/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/deprecated/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleDetails } from 'shared/consts/router';
import { ToggleFeature } from 'shared/features';
import {
    Article, ArticleTextBlock,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import EyeIcon from '../../../../shared/assets/icons/eyeIcon.svg';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticlleListItem = (props: ArticleListItemProps) => {
    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={<ArticleListItemRedesigned {...props} />}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
};
