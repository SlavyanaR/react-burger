import React, { FC, useEffect } from "react";
import ModalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ReactDOM from "react-dom";
import { TModal } from "../../services/types/data";

const modalRoot = document.getElementById('modals') as HTMLElement;

const Modal: FC<TModal> = ({ title = '', children, onClose }) => {
    const [isOpen, setIsOpen] = React.useState(true);

    function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") {
            setIsOpen(false);
            onClose()
        }
    }
    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKey)
            return () => {
                document.removeEventListener('keyup', onKey);
            }
        }
    }, [isOpen])

    return ReactDOM.createPortal(
        (<section className={ModalStyles.popup}>
            <ModalOverlay onClick={onClose} />
            <div className={`${ModalStyles.container} pt-10 pb-15 pr-10 pl-10`}>
                <button className={ModalStyles.close_button} onClick={onClose} />
                <h2 className={`${ModalStyles.title} text text_type_main-large`}>
                    {title}
                </h2>
                <>
                    {children}
                </>
            </div>
        </section>),
        modalRoot
    )
}

export default Modal;