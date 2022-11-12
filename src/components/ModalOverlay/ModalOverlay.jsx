import React from "react";
import ModalOverlayStyles from './ModalOverlay.module.css';
import {itemTypesModalOverlay} from "../../utils/propTypes";

export default function ModalOverlay({ onClick }) {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClick} />
    )
}

ModalOverlay.propTypes = {
    onClick: itemTypesModalOverlay,
}
