import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Category from "../Category/Category";
import IngredientDetail from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { SET_INFO_CHOSEN_INGREDIENT, DELETE_INFO_CHOSEN_INGREDIENT } from "../../services/actions/chosenIngredient";

export default function BurgerIngredients() {
    const dispatch = useDispatch();
    const items = useSelector(store => store.ingredientsApi);
    const [openingDetails, setOpeningDetails] = React.useState(false);
    const chosenItem = useSelector(store => store.chosenIngredient);

    const [current, setCurrent] = React.useState('bun');
    const containerRef = useRef();
    const bunRef = useRef();
    const mainRef = useRef();
    const sauceRef = useRef();


    const hightlightTab = () => {
        const refs = [bunRef, mainRef, sauceRef];
        const positions = refs.map(item => {
            return Math.abs(item.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
        })
        const currentTabRef = refs[positions.indexOf(Math.min.apply(null, positions))];
        const currentSection = currentTabRef.current.dataset.type;
        setCurrent(currentSection)
    }

    const handlerScroll = (value) => {
        setCurrent(value);
        if (value === 'bun') { bunRef.current.scrollIntoView({behavior: "smooth"}) }
        else if (value === 'sauce') { sauceRef.current.scrollIntoView({behavior: "smooth"}) }
        else { mainRef.current.scrollIntoView({behavior: "smooth"}) }
    }

    function openIngridientsDetail(card) {
        dispatch({
            type: SET_INFO_CHOSEN_INGREDIENT,
            item: card
        })
        setOpeningDetails(true);
    }

    function closePopup() {
        setOpeningDetails(false);
        dispatch({
            type: DELETE_INFO_CHOSEN_INGREDIENT
        })
    }

    return (
        <section className={BurgerIngredientsStyles.ingridients}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={BurgerIngredientsStyles.tab}>
                <Tab value="bun" active={current === 'bun'} onClick={handlerScroll} >
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handlerScroll}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handlerScroll}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerIngredientsStyles.menu} ref={containerRef} onScroll={hightlightTab}>
                <Category cards={items} type='bun' refer={bunRef} onClick={openIngridientsDetail} headerKey='bun' />
                <Category cards={items} type='sauce' refer={sauceRef} onClick={openIngridientsDetail} headerKey='main' />
                <Category cards={items} type='main' refer={mainRef} onClick={openIngridientsDetail} headerKey='main' />
            </div>
            {openingDetails &&
                <Modal title='Детали ингредиента' onClose={closePopup} >
                    <IngredientDetail element={chosenItem} />
                </Modal>
            }
        </section>
    )
}
