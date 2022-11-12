import React from "react";
import IngredientDetailsStyles from './IngredientDetails.module.css';
import { itemTypesingredientItem } from '../../utils/propTypes';

export default function IngredientDetail({ element }) {
    return (
        <>
            <img src={element.image} className={IngredientDetailsStyles.image} alt={"Детали"} />
            <p className=" text text_type_main-medium mt-4 mb-8">
                {element.name}
            </p>
            <ul className={`${IngredientDetailsStyles.description} pr-15 pl-15`}>
                <li className={`${IngredientDetailsStyles.description_element} pb-2`} >
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{element.calories}</p>
                </li>
                <li className={IngredientDetailsStyles.description_element}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.proteins}</p>
                </li>
                <li className={IngredientDetailsStyles.description_element}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.fat}</p>
                </li>
                <li className={IngredientDetailsStyles.description_element}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}
IngredientDetail.propTypes = {
    element: itemTypesingredientItem
}
