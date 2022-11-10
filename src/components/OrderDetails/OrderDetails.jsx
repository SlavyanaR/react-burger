import React from "react";
import doneImage from "../../images/done.png";
import OrderDaetailsStyle from './OrderDetails.module.css'
import {ingredientItemTypes} from "../../utils/propTypes";

export default function OrderDetails({ number }) {
    return (
        <>
            <p className="text text_type_digits-large pb-8">
                {number}
            </p>
            <p className=" text text_type_main-medium">
                идентификатор заказа
            </p>
            <img src={doneImage} className={`${OrderDaetailsStyle.image} pt-15 pb-15`} alt={"Детали заказа"} />
            <p className='text text_type_main-default pb-2'>
                Ваш заказ начали готовить
            </p>
            <p className='text text_type_main-default text_color_inactive'>
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    )
}

OrderDetails.propTypes = {
    number: ingredientItemTypes
}
