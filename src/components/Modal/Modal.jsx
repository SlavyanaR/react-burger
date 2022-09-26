import React from "react";
import ModalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ReactDOM from "react-dom";

export default function Modal({ title, children, onClose }) {
    const [isOpen, setIsOpen] = React.useState(true);

    function onKey(e) {
        if (e.key === "Escape") { setIsOpen(false); onClose() }
    }
    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKey)
            return () => {
                document.removeEventListener('keydown', onKey);
            }
        }
    }, [isOpen])
    return ReactDOM.createPortal(
        (<section className={ModalStyles.popup}>
            <ModalOverlay onClick={onClose} />
            <div className={ModalStyles.container + " pt-10 pb-15 pr-10 pl-10"}>
                <button className={ModalStyles.close_button} onClick={onClose} />
                <h2 className={ModalStyles.title + " text text_type_main-large"}>
                    {title}
                </h2>
                <>
                    {children}
                </>
            </div>
        </section>),
        document.getElementById('modals')
    )
}