import React, { useMemo }  from "react";
import CategoryStyles from "./Category.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { DataContext } from "../../../services/appContect";

export default function Category({ cards, type, onClick }) {
    const types = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки'
    }
    const cardsData = cards;
    return (
        <>
            <h2 className={`${CategoryStyles.title} pt-10 pb-6 text text_type_main-medium`}>{types[type]}</h2>
            <div className={`${CategoryStyles.category} pl-4 pr-4`}>
                {
                    useMemo(() => {
                        return cards.filter(prod => prod.type === type)
                            .map(card => {
                                return (
                                    <Card card={card} key={card._id} onClick={() => onClick(card)} />
                                )
                            })
                    }, [cards])
                }
            </div>
        </>
    )
}
Category.propTypes = {
    cards: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

function Card({ card, onClick }) {
    return (
        <div className={CategoryStyles.card} key={card._id} onClick={onClick} >
            <img src={card.image} alt={card.name} />
            <p className="text text_type_main-default">{card.name}</p>
            <div className={CategoryStyles.price_container}>
                <p className="text text_type_main-default pr-1">{card.price}</p>
                <CurrencyIcon />
            </div>
        </div>
    )
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}