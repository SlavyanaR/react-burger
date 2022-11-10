import { useDrag } from "react-dnd";
import LayerStyles from './Layer.module.css';
import { ingredientItemTypes } from '../../utils/propTypes';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Layer({ prod, index, handleDelete, handleDrag, handleDrop }) {
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
            <DragIcon />
            <ConstructorElement
                text={prod.name}
                price={prod.price}
                thumbnail={prod.image}
                handleClose={(e) => handleDelete(e, index)}
            />
        </li>
    )
}

Layer.propTypes = {
    prod: ingredientItemTypes,
    index: ingredientItemTypes,
    handleDelete: ingredientItemTypes,
    handleDrag: ingredientItemTypes,
    handleDrop: ingredientItemTypes,
}