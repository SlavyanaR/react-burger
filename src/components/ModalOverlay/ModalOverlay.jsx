import React from "react";
import ModalOverlayStyles from './ModalOverlay.module.css';

export default function ModalOverlay({ onClick }) {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClick} />
    )
}