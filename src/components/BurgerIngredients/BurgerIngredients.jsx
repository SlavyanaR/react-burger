import React from "react";
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


export default function BurgerIngredients() {
    

    return(
        <section className={BurgerIngredientsStyles.ingridients}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab >
                    Булки
                </Tab>
                <Tab >
                    Соусы
                </Tab>
                <Tab >
                    Начинки
                </Tab>
            </div>
            <div className={BurgerIngredientsStyles.menu}>
                
            </div>
        </section>
    )
}
