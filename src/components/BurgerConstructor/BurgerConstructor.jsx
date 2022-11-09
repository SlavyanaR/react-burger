import React, { useEffect, useReducer, useState } from "react";
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Layer from "../Layer/Layer";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ADD_INGREDIENT_TO_CONSTRUCTOR, ADD_BUN_IN_CONSTRUCTOR, SORT_INGREDIENTS_IN_CONSTRUCTOR, DELETE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/constructorItems'
import { RESET_ORDER_NUMBER } from '../../services/actions/order';
import { postOrder } from "../../services/actions/index";


export default function BurgerConstructor() {
    const dispatch = useDispatch();
    const itemsMenu = useSelector(store => store.ingredientsApi);
    const ingredientsConstructor = useSelector(store => store.constructorItems.ingredientsConstructor);
    const orderNum = useSelector(store => store.order.number.toString());
    const [BunElement, setBunElement] = useState(null);
    const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type !== 'bun')
    const [isSort, setIsSort] = useState(false);
    const [droppedIndex, setDroppedIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [openingOrder, setOpeningOrder] = React.useState(false);

    const handleDrag = (draggedTargetIndex) => {
        setIsSort(true);
        setDraggedIndex(draggedTargetIndex)
    };

    const handleDrop = (e, droppedTargetIndex) => {
        e.preventDefault();
        setDroppedIndex(droppedTargetIndex)
    };

    const [, targetDrop] = useDrop({
        accept: 'item',
        drop(item) {
            if (isSort) sortIngredientsInConstructor(item, droppedIndex, draggedIndex)
            else {
                item.type === 'bun' ?
                    changeBunInConstructor(item) :
                    addIngredientToConstructor(item)
            };

        }
    })

    const addIngredientToConstructor = (prod) => {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: prod
        });
        dispatchPrice({
            type: 'increment',
            item: prod
        })
    }

    const changeBunInConstructor = (bun) => {
        dispatch({
            type: ADD_BUN_IN_CONSTRUCTOR,
            item: bun
        })
        dispatchPrice({
            item: bun
        })
    }

    const sortIngredientsInConstructor = (item, droppedIndex, draggedIndex) => {
        dispatch({
            type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
            draggedIndex: draggedIndex,
            droppedIndex: droppedIndex,
            item: item
        })
        setIsSort(false);
        setDraggedIndex(null);
        setDroppedIndex(null);
    };

    const handleDeleteItem = (e, index) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0];
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            ingredients: notBunsIngredients,
            id: id,
        })
        dispatchPrice({
            type: 'decrement',
            item: item
        })
    };

    const makeOrder = () => {
        dispatch(postOrder(ingredientsConstructor));
        setOpeningOrder(true);
    }

    function closePopup() {
        setOpeningOrder(false);
        dispatch({
            type: RESET_ORDER_NUMBER
        })
    }

    useEffect(() => {
        if (ingredientsConstructor.length) setBunElement(ingredientsConstructor.find(el => el.type === 'bun') || null);
    }, [ingredientsConstructor]);

    const [state, dispatchPrice] = useReducer(reducer, { price: 0 });

    function reducer(state, action) {
        switch (action.item.type) {
            case ('bun'): return (BunElement ?
                { price: state.price - (BunElement.price * 2) + (action.item.price * 2) } :
                { price: state.price + (action.item.price * 2) })
            case ('main'):
            case ('sauce'):
                switch (action.type) {
                    case ('increment'): {
                        return ({ price: state.price + action.item.price })
                    }
                    case ('decrement'): {
                        return ({ price: state.price - action.item.price })
                    }
                    default: throw new Error();
                }
            default: throw new Error();
        }
    }

    const totalPrice = state.price;

    return (
        <section className={`${BurgerConstructorStyles.constructor} pt-25 pl-4 pr-4`} ref={targetDrop}>
            {itemsMenu.length && ingredientsConstructor.length ?
                <>
                    {BunElement &&
                        (<div className={`${BurgerConstructorStyles.constructor_element} pb-4`} >
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={BunElement.name + " (верх)"}
                                price={BunElement.price}
                                thumbnail={BunElement.image}
                            />
                        </div>)
                    }
                    <ul className={BurgerConstructorStyles.layers_list}>
                        {(notBunsIngredients.length) ?
                            (notBunsIngredients
                                .map((item, index) => {
                                    return (
                                        <Layer
                                            prod={item}
                                            index={index}
                                            key={item._id}
                                            handleDelete={handleDeleteItem}
                                            handleDrag={handleDrag}
                                            handleDrop={handleDrop}
                                        />
                                    )
                                })) :
                            (<p className={`${BurgerConstructorStyles.add_ingredients} text text_type_main-default`}>Добавь ингредиенты</p>)
                        }
                    </ul>
                    {BunElement &&
                        <div className={`${BurgerConstructorStyles.constructor_element} pt-4`}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={BunElement.name + " (низ)"}
                                price={BunElement.price}
                                thumbnail={BunElement.image}
                            />
                        </div>}

                    <div className={`${BurgerConstructorStyles.order_box} pt-10 pb-10`}>
                        <div className={`${BurgerConstructorStyles.price_container} pr-10`}>
                            <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button type="primary" size="large" onClick={makeOrder} disabled={!BunElement}>
                            Оформить заказ
                        </Button>
                    </div>
                </>
                :
                <p className={`${BurgerConstructorStyles.start} text text_type_main-default`}>
                    Начни собирать бургер
                </p>
            }
            {openingOrder &&
                (<Modal title=' ' onClose={closePopup} >
                    <OrderDetails number={orderNum} />
                </Modal>)
            }
        </section>
    )
}
