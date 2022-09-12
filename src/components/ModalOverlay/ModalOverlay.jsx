import React from "react";
import ModalOverlayStyles from './ModalOverlay.module.scc';


export default function ModalOverlay ({onClick}) {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClick}/>
    )
}