import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { Icon } from 'shared/ui/deprecated/Icon/Icon';
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
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    className={cls.btn}
                    onClick={onClick(viewType.view)}
                    theme={ThemeButton.CLEAR}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                    />
                </Button>
            ))}
        </div>
    );
};
