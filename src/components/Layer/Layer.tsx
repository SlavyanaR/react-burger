import React, { FC, DragEvent } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import LayerStyles from './Layer.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../services/types/data";

type TLayer = {
    prod: TIngredient,
    index: number,
    handleDrag: (index: number) => void,
    handleDrop: (e: DragEvent<HTMLLIElement>, index: number) => void
}

export const Layer: FC<TLayer> = ({ prod, index, handleDelete, handleDrag, handleDrop }: TLayer) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: prod,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    });
    return (
        <li className={`${LayerStyles.layer_element} pb-4`}
            draggable
            ref={dragRef}
            onDrag={() => handleDrag(index)}
            onDrop={(e) => handleDrop(e, index)}
            style={{ opacity }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={prod.name}
                price={prod.price}
                thumbnail={prod.image}
                handleClose={(e) => handleDelete(e, index)}
            />
        </li>
    )
}

