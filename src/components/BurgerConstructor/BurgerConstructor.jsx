import React from "react";
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {ingredientItemTypes} from '../../utils/propTypes';

export default function BurgerConstructor({ cards }) {
    const [openingOrder, setOpeningOrder] = React.useState(false);

    function openOrderDetails() {
        setOpeningOrder(true);
    }

    function closePopup() {
        setOpeningOrder(false);
    }

    return (
        <section className={`${BurgerConstructorStyles.constructor} pt-25 pl-4 pr-4`}>
            <div className={BurgerConstructorStyles.constructor_element}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price="1255"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                />
            </div>
            <ul className={`${BurgerConstructorStyles.layers_list} pt-4 pb-4`}>
                {
                    cards
                        .filter(prod => prod.type == 'main')
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
                    text="Краторная булка N-200i (низ)"
                    price="1255"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                />
            </div>
            <div className={`${BurgerConstructorStyles.order_box} pt-10 pb-10`}>
                <div className={`${BurgerConstructorStyles.price_container} pr-10`}>
                    <span className="text text_type_digits-medium pr-2">610</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={openOrderDetails}>
                    Оформить заказ
                </Button>
                {openingOrder &&
                    <Modal title=' ' onClose={closePopup}>
                        <OrderDetails />
                    </Modal>
                }
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    cards: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
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