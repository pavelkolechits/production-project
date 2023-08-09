import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/Text';
import { ToggleFeature } from 'shared/features';
import { Text } from 'shared/ui/redesigned/Text';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent = ({ className, block }: ArticleTextBlockComponentProps) => {
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls.ArticleTextBlockComponent, {}, [
                className,
            ])}
        >
            {block.title && (
                <ToggleFeature
                    name="isAppRedesigned"
                    on={<Text title={block.title} className={cls.title} />}
                    off={(
                        <TextDeprecated
                            title={block.title}
                            className={cls.title}
                        />
                    )}
                />
            )}
            {block.paragraphs.map((paragraph, index) => (
                <ToggleFeature
                    name="isAppRedesigned"
                    on={(
                        <Text
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    )}
                    off={(
                        <TextDeprecated
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    )}
                />
            ))}
        </div>
    );
};
