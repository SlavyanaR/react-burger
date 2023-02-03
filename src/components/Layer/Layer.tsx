import React, { FC, DragEvent } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from '../../services/hooks';
import LayerStyles from './Layer.module.css';
import { ingredientType } from '../../utils/propTypes';
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../services/types/data";
import { DELETE_INGREDIENT_FROM_CONSTRUCTOR } from "../../services/action-types";


type TConstructorItems = {
    prod: TIngredient,
    index: number,
    handleDrag: (index: number) => void,
    handleDrop: (e: DragEvent<HTMLLIElement>, index: number) => void
}


const Layer: FC<TConstructorItems> = ({ prod, index, handleDrag, handleDrop }) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: prod,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    });
    const dispatch = useDispatch();
    const ingredientsConstructor = useSelector(store => store.constructorItems.ingredientsConstructor);
    const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type !== 'bun')
    const handleDelete = (index: number) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0];
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            ingredients: notBunsIngredients,
            id: id,
        })
    };

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
                handleClose={() => { handleDelete(index) }}
            />
        </li>
    )
}

export default Layer;