import React, { useMemo, FC } from "react";
import CategoryStyles from './Category.module.css';
import { Card}
import { TIngredientsCategory } from "../../services/types/data";


const types : {[name: string]: string}= {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}
export const Category: FC<TIngredientsCategory> = ({ cards, type, refer, onClick, headerKey }: TIngredientsCategory) => {
    const typeArray = useMemo(() => { return cards.filter(prod => prod.type === type) }, [cards])
    return (
        <>
            <h2 ref={refer} className={`${CategoryStyles.title} pt-10 pb-6 text text_type_main-medium`} data-type={headerKey} >
                {types[type]}
            </h2>
            <div className={`${CategoryStyles.category} pl-4 pr-4`}>
                {
                    typeArray.map(card => {
                        return (
                            <Card card={card} key={card._id} />
                        )
                    })
                }
            </div>
        </>
    )
}
