import React, { useMemo } from "react";
import CategoryStyles from './Category.module.css';
import PropTypes from 'prop-types';
import { Card } from "../Card/Card";

const types = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}
export default function Category({ cards, type, refer, onClick, headerKey }) {
    const typeArray = useMemo(() => { return cards.filter(prod => prod.type === type) }, [cards])
    return (
        <>
            <h2 ref={refer} className={`${CategoryStyles.title} pt-10 pb-6 text text_type_main-medium`} data-type={headerKey} >{types[type]}</h2>
            <div className={`${CategoryStyles.category} pl-4 pr-4`}>
                {typeArray.map(card => {
                    return (
                        <Card card={card} key={card._id} onClick={() => onClick(card)} />
                    )
                })
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
