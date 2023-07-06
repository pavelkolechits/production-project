import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationList } from 'entities/Natifications';
import cls from './NotificationButton.module.scss';
import NotificationIcon from '../../../../shared/assets/icons/notification.svg';

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
    return (

        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom left"
            trigger={(
                <Button theme={ThemeButton.CLEAR}>
                    <Icon inverted Svg={NotificationIcon} />
                </Button>
            )}
        >
            <NotificationList className={cls.notifications} />

        </Popover>

    );
};
