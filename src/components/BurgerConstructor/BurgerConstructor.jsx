import React from "react";
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor () {
    return (
        <section className={BurgerConstructorStyles.constructor + ' ' + 'pt-25 pl-4 pr-4'}>
            <div className={BurgerConstructorStyles.constructor_element}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price="1255"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                />
            </div>
            <div className={BurgerConstructorStyles.constructor_element}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price="1255"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                />
            </div>
            <div className={BurgerConstructorStyles.order_box + " " + "pt-10 pb-10"}>
                <div className={"BurgerConstructorStyles.price_container pr-10"}>
                    <span className="text text_type_digits-medium pr-2">610</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large">
                    Сделать заказ
                </Button>
            </div>
        </section>
    )
}
