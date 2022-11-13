import React from "react";
import ModalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from "prop-types";

export default function ModalOverlay({ onClick }) {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClick} />
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
}
