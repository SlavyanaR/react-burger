import React, { useEffect, useMemo, useState } from "react";
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
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from "../../utils/utils";
import { useHistory } from 'react-router-dom';


export default function BurgerConstructor() {
    const dispatch = useDispatch();
    const itemsMenu = useSelector((store) => store.ingredientsApi);
    const ingredientsConstructor = useSelector((store) => store.constructorItems.ingredientsConstructor);
    const idList = useMemo(() => {
        return ingredientsConstructor.map((item) => item._id);
    }, [ingredientsConstructor]);
    const orderNum = useSelector((store) => store.order.number.toString());
    const [BunElement, setBunElement] = useState(null);
    const notBunsIngredients = ingredientsConstructor.filter((prod) => prod.type !== 'bun')
    const [isSort, setIsSort] = useState(false);
    const [droppedIndex, setDroppedIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [openingOrder, setOpeningOrder] = React.useState(false);
    const cookie = getCookie('token');
    const history = useHistory();

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
            item: {
                ...prod,
                uuid: uuidv4()
            }
        });
    }

    const changeBunInConstructor = (bun) => {
        dispatch({
            type: ADD_BUN_IN_CONSTRUCTOR,
            item: bun,
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
    };

    const makeOrder = () => {
        cookie && dispatch(postOrder(idList));
        !cookie && history.push('/login')
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

    const totalPrice = useMemo(() => {
        return ingredientsConstructor.reduce((price, current) => {
            if (current.type == 'bun') { return price + 2 * current.price }
            else { return price + current.price }
        }, 0)
    }, [ingredientsConstructor])

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
                                            key={item.uuid}
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
                        {itemsMenu.length === 0
                            ? (<Button type="primary" size="large">
                                Оформить заказ
                            </Button>)
                            : (<Button type="primary" size="large" onClick={makeOrder} disabled={!BunElement}>
                                Оформить заказ
                            </Button>)}
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
