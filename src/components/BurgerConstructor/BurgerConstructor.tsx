import React, { useEffect, useMemo, useState, DragEvent, FC } from "react";
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
import { TLocation } from "../../services/types/data";
import { TIngredient } from "../../services/types/data";


const  BurgerConstructor: FC =()=> {
    const dispatch = useDispatch();
    const itemsMenu = useSelector((store) => store.ingredientsApi);
    const ingredientsConstructor = useSelector((store) => store.constructorItems.ingredientsConstructor);
    const idList = useMemo(() => {
        return ingredientsConstructor.map((item) => item._id);
    }, [ingredientsConstructor]);
    const [BunElement, setBunElement] = useState<TIngredient | null>(null);
    const notBunsIngredients = ingredientsConstructor.filter((prod) => prod.type !== 'bun')
    const [isSort, setIsSort] = useState(false);
    const [droppedIndex, setDroppedIndex] = useState<number | null>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [openingOrder, setOpeningOrder] = React.useState(false);
    const cookie = getCookie('token');
    const history = useHistory<TLocation>();
    const { orderDetailsRequest } = useSelector((state) => state.order);

    const handleDrag = (draggedTargetIndex:number) => {
        setIsSort(true);
        setDraggedIndex(draggedTargetIndex)
    };

    const handleDrop = (e:DragEvent<HTMLLIElement>, droppedTargetIndex:number) => {
        e.preventDefault();
        setDroppedIndex(droppedTargetIndex)
    };

    const [, targetDrop] = useDrop({
        accept: 'item',
        drop(item:TIngredient) {
            if (isSort) sortIngredientsInConstructor(item, droppedIndex!, draggedIndex!)
            else {
                const key = uuidv4();
                item.type === 'bun' ?
                dispatch(changeBunInConstructor(item)) :
                dispatch(addIngredientToConstructor({ ...item, key: key }))
            };

        }
    })

    const addIngredientToConstructor = (prod:TIngredient) => {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: {
                ...prod,
                uuid: uuidv4()
            }
        });
    }

    const changeBunInConstructor = (bun:TIngredient) => {
        dispatch({
            type: ADD_BUN_IN_CONSTRUCTOR,
            item: bun,
        })
    }

    const sortIngredientsInConstructor = (item:TIngredient, droppedIndex:number, draggedIndex:number) => {
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

    const handleDeleteItem = (index:number) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0];
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            ingredients: notBunsIngredients,
            id: id,
        })
    };

    const makeOrder = (idList:string[]) => {
        cookie && dispatch(postOrder(idList));
        !cookie && history.push('/login')
        setOpeningOrder(true);
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
                                            key={item.key}
                                            //handleDelete={handleDeleteItem}
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
                        {itemsMenu.length === 0 || !!orderDetailsRequest
                            ? (<Button type="primary" size="large">
                                {orderDetailsRequest ? '...Заказ оформляется' : 'Оформить заказ'}
                            </Button>)
                            : (<Button type="primary" size="large" onClick={() => { makeOrder(idList) }} disabled={!BunElement}>
                                Оформить заказ
                            </Button>)}
                    </div>
                </>
                :
                <p className={`${BurgerConstructorStyles.start} text text_type_main-default`}>
                    Начни собирать бургер
                </p>
            }

        </section>
    )
}
export default BurgerConstructor