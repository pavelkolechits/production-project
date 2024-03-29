import { Suspense } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Loader } from 'shared/ui/deprecated/Loader/Loader';
import { Modal } from 'shared/ui/redesigned/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>

        </Modal>
    );
};
