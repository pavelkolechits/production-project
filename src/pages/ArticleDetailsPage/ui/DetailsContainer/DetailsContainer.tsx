import { Card } from 'shared/ui/redesigned/Card/Card';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from 'entities/Article';
import cls from './DetailsContainer.module.scss';

interface DetailsContainerProps {
    className?: string
}

export const DetailsContainer = ({ className }: DetailsContainerProps) => {
    const { id } = useParams<{id: string}>();
    if (!id) {
        return null;
    }
    return (
        <Card max padding="24" className={className}>
            <ArticleDetails id={id} />
        </Card>
    );
};
