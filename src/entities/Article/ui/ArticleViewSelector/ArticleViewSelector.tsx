import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from 'shared/ui/deprecated/Icon/Icon';
import { ToggleFeature } from 'shared/features';
import { Icon } from 'shared/ui/redesigned/Icon/Icon';
import { Card } from 'shared/ui/redesigned/Card/Card';
import cls from './ArticleViewSelector.module.scss';
import ListIcon from '../../../../shared/assets/icons/articleListIcon.svg';
import TiledIcon from '../../../../shared/assets/icons/articleTempIcon.svg';
import { ArticleView } from '../../model/consts/consts';

interface ArticleViewSelectorProps {
    className?: string;
    view?: ArticleView;
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        icon: TiledIcon,
        view: ArticleView.SMALL,
    },
    {
        icon: ListIcon,
        view: ArticleView.BIG,
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { className, onViewClick, view } = props;
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };
    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <Card className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <Icon
                            width={16}
                            height={16}
                            onClick={onClick(viewType.view)}
                            clickable
                            Svg={viewType.icon}
                            className={classNames(cls.icon, { [cls.notSelected]: viewType.view !== view }, [])}
                        />

                    ))}
                </Card>
            )}
            off={(
                <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            className={cls.btn}
                            onClick={onClick(viewType.view)}
                            theme={ThemeButton.CLEAR}
                        >
                            <IconDeprecated
                                Svg={viewType.icon}
                                className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            )}
        />

    );
};
