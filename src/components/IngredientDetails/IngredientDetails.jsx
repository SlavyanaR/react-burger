import React from "react";
import IngredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

export default function IngredientDetail({ element }) {
    return (
        <>
            <img src={element.image} className={IngredientDetailsStyles.image} />
            <p className=" text text_type_main-medium pt-4 pb-8">
                {element.name}
            </p>
            <ul className={`${IngredientDetailsStyles.description} pr-15 pl-15`}>
                <li className={IngredientDetailsStyles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{element.calories}</p>
                </li>
                <li className={IngredientDetailsStyles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.proteins}</p>
                </li>
                <li className={IngredientDetailsStyles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.fat}</p>
                </li>
                <li className={IngredientDetailsStyles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}
IngredientDetail.propTypes = {
    element: PropTypes.object.isRequired
}
