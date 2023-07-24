import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './PageLoader.module.scss';
import { Loader } from '../Loader/Loader';

interface PageLoaderProps {
    className?: string
}

/**
 * Устарел, используем новый компанент из папки redesigned
 * @deprecated
 */

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
