import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo } from 'react';
import { Card as CardDeprecated } from 'shared/ui/deprecated/Card/Card';
import { Card as CardRedesigned } from 'shared/ui/redesigned/Card/Card';
import { Skeleton as SkeletonDeprecated } from 'shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from 'shared/ui/redesigned/Skeleton/Skeleton';
import { toggleFeature } from 'shared/features';
import cls from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/consts/consts';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const Skeleton = toggleFeature({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const Card = toggleFeature({
        name: 'isAppRedesigned',
        on: () => CardRedesigned,
        off: () => CardDeprecated,
    });

    const mainClass = toggleFeature({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListItemRedesigned,
        off: () => cls.ArticleListItem,
    });

    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(mainClass, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton borderRadius="50%" height={30} width={30} />
                        <Skeleton width={150} height={16} className={cls.username} />
                        <Skeleton width={150} height={16} className={cls.date} />
                    </div>
                    <Skeleton width={250} height={24} className={cls.title} />
                    <Skeleton height={200} className={cls.img} />
                    <div className={cls.footer}>
                        <Skeleton height={36} width={200} />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(mainClass, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <Skeleton width={200} height={200} className={cls.img} />
                </div>
                <div className={cls.infoWrapper}>
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton width={150} height={16} className={cls.title} />
            </Card>
        </div>
    );
});
