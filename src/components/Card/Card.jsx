import React from "react";
import CardStyles from './Card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector,useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/propTypes";
import { Link, useLocation } from 'react-router-dom';
import {openIngridientsDetail} from '../../services/actions/chosenIngredient';

export function Card({ card }) {
    const dispatch = useDispatch();
    const location = useLocation();

    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: card,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    })
    const counter = useSelector(state => state.constructorItems.counter[card._id]);

    const handleopenIngridientsDetail = (card) => {
		dispatch(openIngridientsDetail(card));
	};

    return (
        <Link
        to={{ pathname: `/ingredients/${card._id}`, state: { background: location } }}
        onClick={() => handleopenIngridientsDetail(card)}
        className={`${CardStyles.link}`}
        >
            <div className={CardStyles.card_available} key={card._id} ref={dragRef} style={{ opacity }} draggable >
                <img src={card.image} alt={card.name} />
                <p className="text text_type_main-default">{card.name}</p>
                <div className={CardStyles.price_container}>
                    <p className="text text_type_main-default pr-1">{card.price}</p>
                    <CurrencyIcon />
                </div>
                {Boolean(counter) && <Counter count={counter} size="default" />}
            </div>
        </Link>
    )
}

Card.propTypes = {
    card: ingredientType,
    onClick: PropTypes.func.isRequired,
}
