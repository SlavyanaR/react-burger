import React, { useEffect, useMemo, useState, FC } from "react";
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../services/hooks";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Layer from "../Layer/Layer";
import { ADD_INGREDIENT_TO_CONSTRUCTOR, ADD_BUN_IN_CONSTRUCTOR, SORT_INGREDIENTS_IN_CONSTRUCTOR, DELETE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/action-types/constructorItemsTypes'
import { postOrder } from "../../services/actions/order";
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from "../../utils/utils";
import { useHistory } from 'react-router-dom';
import { TIngredient } from "../../services/types/data";
import { TLocation } from "../../services/types/data";

interface DropItem {
    ingredient: TIngredient;
}


const BurgerConstructor: FC = () => {
    const { bun, items, idList, bunRequestSuccess } = useSelector((store) => store.constructorItems);
    const { orderDetailsRequest } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const cookie = getCookie('token');
    const history = useHistory<TLocation>();
    const notBunsIngredients = useMemo(
        () => items.filter((item) => item.type !== 'bun'),
        [items]);


    useEffect(() => {
        const totalPrice = items.reduce((sum, item) => sum + bun.price, !bun ? 0 : (bun.price * 2));
        setTotal(totalPrice);
    }, [bun, notBunsIngredients]);


    const makeOrder = (idList: string[]) => {
        cookie && dispatch(postOrder(idList));
        !cookie && history.push('/login')
    }


    const [, targetDrop] = useDrop({
        accept: 'item',
        drop(item: DropItem) {
            if (item.ingredient.type === "bun") {
                dispatch({
                    type: ADD_BUN_IN_CONSTRUCTOR,
                    data: item.ingredient,
                });
            } else {
                dispatch({
                    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                    data: { ...item.ingredient, id: Date.now() },
                });
            }
        }
    })


    return (
        <section className={`${BurgerConstructorStyles.constructor} pt-25 pl-4 pr-4`} ref={targetDrop}>
            {!bunRequestSuccess
                ? (< p className={`${BurgerConstructorStyles.start} text text_type_main-default`}>
                    Начни собирать бургер
                </p>)
                : (<div className={`${BurgerConstructorStyles.constructor_element} pb-4`} >
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + '(верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        key={bun._id}
                    />
                </div>)
            }
            {items.length === 0
                ? (<p className={`${BurgerConstructorStyles.add_ingredients} text text_type_main-default`}>Добавь ингредиенты</p>)
                : < ul className={BurgerConstructorStyles.layers_list}>
                    {items.map((elem, index) => {
                        if (elem.type === 'sauce' || elem.type === 'main') {
                            return (
                                <Layer
                                    key={elem.id}
                                    items={elem}
                                    index={index}
                                />)
                        }
                    })}
                </ul>
            }
            {!bunRequestSuccess
                ? (<div className={`${BurgerConstructorStyles.constructor_element} pt-4` >}>
                    :(
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + '(низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        key={`bottom: ${bun._id}`}
                    />)
                </div>)


                < div className={`${BurgerConstructorStyles.order_box} pt-10 pb-10`}>
            <div className={`${BurgerConstructorStyles.price_container} pr-10`}>
                <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
                <CurrencyIcon type="primary" />
            </div>
            {itemsMenu.length === 0 || !!orderDetailsRequest
                ? (<Button type="primary" size="large">
                    {orderDetailsRequest ? '...Заказ оформляется' : 'Оформить заказ'}
                </Button>)
                : (<Button type="primary" size="large" onClick={makeOrder(idList)} disabled={!BunElement}>
                    Оформить заказ
                </Button>)}
        </div>

            :


        </section >
    )
}
export default BurgerConstructor