import { ReactNode, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AnimationProvider, useAnimationLibs } from 'shared/lib/helpers/components/AnimationProvider';
import { toggleFeature } from 'shared/features';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const height = window.innerHeight - 100;

const DrawerContent = (props: DrawerProps) => {
    const { Gesture, Spring } = useAnimationLibs();
    const {
        className, children, isOpen, onClose, lazy,
    } = props;
    const { theme } = useTheme();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);
    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);
    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };
    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));
    const mainClass = toggleFeature({
        name: 'isAppRedesigned',
        on: () => cls.DrawerNew,
        off: () => cls.DrawerOld,
    });
    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Drawer, {}, [className, theme, 'app', mainClass])}>
                <Overlay onClick={close} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>

    );
};

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();
    if (!isLoaded) {
        return null;
    }
    return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
    return (

        <AnimationProvider>
            <DrawerAsync {...props} />
        </AnimationProvider>
    );
};
