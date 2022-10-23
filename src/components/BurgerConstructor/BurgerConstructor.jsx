import React, { useContext, useEffect, useMemo, useReducer } from "react";
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientItemTypes } from '../../utils/propTypes';
import { DataContext, OrderContext } from "../../services/appContect";

export default function BurgerConstructor({ onClick }) {
    const { cards } = useContext(DataContext);
    const { setOrderList } = useContext(OrderContext);
    const [bunEl, setBunEl] = React.useState({});
    const currentOrder = [];

    currentOrder.push(useMemo(() => { return cards.find(el => el.type === 'bun') }, [cards]));
    useMemo(() => {
        return cards.forEach(el => {
            if (el.type != 'bun') { currentOrder.push(el) }
        })
    }, [cards])

    React.useEffect(() => {
        if (cards.length) setBunEl(cards.find(el => el.type === 'bun'));
    }, [cards.length]);
    const [state, dispatch] = useReducer(reducer, { price: 0 });

    function reducer(state, item) {
        switch (item.type) {
            case ('bun'): return ({ price: state.price + (item.price * 2) })
            case ('main'): return ({ price: state.price + item.price })
            case ('sauce'): return ({ price: state.price + item.price })
            default: throw new Error();
        }
    }

    useEffect(() => {
        if (cards.length) {
            currentOrder.forEach(item => {
                dispatch(item)
            })
            setOrderList(currentOrder);
        }
    }
        , [cards.length]
    )
    const totalPrice = state.price;

    return (
        <section className={`${BurgerConstructorStyles.constructor} pt-25 pl-4 pr-4`}>
            {cards.length ?
                <><div className={BurgerConstructorStyles.constructor_element}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bunEl.name + " (верх)"}
                        price={bunEl.price}
                        thumbnail={bunEl.image}
                    />
                </div>
                    <ul className={`${BurgerConstructorStyles.layers_list} pt-4 pb-4`}>
                        {
                            cards
                                .filter(prod => prod.type != 'bun')
                                .map(item => {
                                    return (
                                        <Layer prod={item} key={item._id} />
                                    )
                                })
                        }
                    </ul>
                    <div className={BurgerConstructorStyles.constructor_element}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bunEl.name + " (низ)"}
                            price={bunEl.price}
                            thumbnail={bunEl.image}
                        />
                    </div>
                    <div className={`${BurgerConstructorStyles.order_box} pt-10 pb-10`}>
                        <div className={`${BurgerConstructorStyles.price_container} pr-10`}>
                            <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
                            <CurrencyIcon />
                        </div>
                        <Button type="primary" size="large" onClick={onClick}>
                            Оформить заказ
                        </Button>
                    </div>
                </>
                : 'loading'
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    cards: PropTypes.array.isRequired,
}

function Layer({ prod }) {
    return (
        <li className={`${BurgerConstructorStyles.layer_element} pb-4`}>
            <DragIcon />
            <ConstructorElement
                text={prod.name}
                price={prod.price}
                thumbnail={prod.image}
            />
        </li>
    )
}
Layer.propTypes = {
    prod: ingredientItemTypes
}