import React from "react";
import ModalOverlayStyles from './ModalOverlay.module.css';
import {ingredientItemTypes} from "../../utils/propTypes";

export default function ModalOverlay({ onClick }) {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClick} />
    )
}

ModalOverlay.propTypes = {
    onClick: ingredientItemTypes,
}
