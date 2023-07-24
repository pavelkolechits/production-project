import './Loader.scss';
import { classNames } from 'shared/lib/helpers/classNames/classNames';

interface LoaderProps {
  className?: string;
}

/**
 * Устарел, используем новый компанент из папки redesigned
 * @deprecated
 */

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
