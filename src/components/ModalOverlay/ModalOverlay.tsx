import React, { FC } from "react";
import ModalOverlayStyles from './ModalOverlay.module.css';
import { TModalOverlay } from "../../services/types/data";

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClick} />
    )
}

export default ModalOverlay;