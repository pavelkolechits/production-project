import { ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ToggleFeature } from 'shared/features';
import cls from './Code.module.scss';
import { Button, ThemeButton } from '../../deprecated/Button/Button';
import CopyIcon from '../../../assets/icons/copyIcon.svg';
import { Icon } from '../../redesigned/Icon/Icon';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = ({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);
    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <pre
                    className={classNames(cls.CodeRedesigned, {}, [className])}
                >
                    <Icon
                        clickable
                        onClick={onCopy}
                        className={cls.copyBtn}
                        Svg={CopyIcon}
                    />
                    <code>{text}</code>
                </pre>
            )}
            off={(
                <pre className={classNames(cls.Code, {}, [className])}>
                    <Button
                        onClick={onCopy}
                        className={cls.copyBtn}
                        theme={ThemeButton.CLEAR}
                    >
                        <CopyIcon className={cls.copyIcon} />
                    </Button>
                    <code>{text}</code>
                </pre>
            )}
        />
    );
};
