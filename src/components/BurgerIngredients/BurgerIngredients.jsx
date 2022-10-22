import React, { useContext }  from "react";
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Category from "./Category/Category";
import PropTypes from 'prop-types';
import IngredientDetail from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { DataContext } from "../../services/appContect";

export default function BurgerIngredients({ onClick }) {
    const [current, setCurrent] = React.useState('one');
    const {cards} = useContext(DataContext);
    const cardsData = cards;


    return (
        <section className={BurgerIngredientsStyles.ingridients}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent} >
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerIngredientsStyles.menu}>
                <Category cards={cardsData} type='bun' onClick={onClick} />
                <Category cards={cardsData} type='sauce' onClick={onClick} />
                <Category cards={cardsData} type='main' onClick={onClick} />
            </div>
                    </section>
    )
}
BurgerIngredients.propTypes = {
    cards: PropTypes.array.isRequired
}



