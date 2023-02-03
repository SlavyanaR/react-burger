import React, { FC, DragEvent, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from '../../services/hooks';
import LayerStyles from './Layer.module.css';
import { ingredientType } from '../../utils/propTypes';
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../services/types/data";
import { DELETE_INGREDIENT_FROM_CONSTRUCTOR, SORT_INGREDIENTS_IN_CONSTRUCTOR } from "../../services/action-types";


type TConstructorItems = {
    items: TIngredient,
    index: number,
}

type TDragItem = {
    index: number;
    type: string;
    id?: string;
};


const Layer: FC<TConstructorItems> = ({ index, items }) => {
    const dispatch = useDispatch();
    const { image, id, price, name } = items;
    const ref = useRef(null);

    const handleDelete = (id: string | undefined) => {
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            id: id,
        });
    };

    const [, drop] = useDrop<TDragItem>({
        accept: "item",
        hover(items) {
            if (!ref.current) {
                return;
            }
            const dragIndex = items.index;
            const hoverIndex = index;
            dispatch({
                type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
                data: { dragIndex, hoverIndex },
            });
            items.index = hoverIndex;
        },
    });

    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: { id, index },
        collect: monitor => {
            return {
                opacity: monitor.isDragging() ? 0.5 : 1,
            };
        }
    });

    //const ingredientsConstructor = useSelector(store => store.constructorItems.ingredientsConstructor);
    //const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type !== 'bun')
    //  const handleDelete = (index: number) => {
    //  const id = notBunsIngredients[index]._id;
    //  const item = notBunsIngredients.splice(index, 1)[0];
    //  dispatch({
    //   type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    //  ingredients: notBunsIngredients,
    //    id: id,
    //  })
    //  };

    return (
        <li className={`${LayerStyles.layer_element} pb-4`}
            draggable
            style={{ opacity }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => { handleDelete(id) }}
            />
        </li>
    )
}

export default Layer;