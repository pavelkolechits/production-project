import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from 'shared/ui/deprecated/Text/Text';
import { ToggleFeature } from 'shared/features';
import { Text } from 'shared/ui/redesigned/Text';
import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = ({ className, block }: ArticleImageBlockComponentProps) => {
    return (
        <div
            className={classNames(cls.ArticleImageBlockComponent, {}, [
                className,
            ])}
        >
            <img src={block.src} alt={block.title} className={cls.img} />
            {block.title && (
                <ToggleFeature
                    name="isAppRedesigned"
                    on={<Text text={block.title} align="center" />}
                    off={(
                        <TextDeprecated
                            text={block.title}
                            align={TextAlign.CENTER}
                        />
                    )}
                />
            )}
        </div>
    );
};
