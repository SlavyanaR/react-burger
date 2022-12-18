export const SET_INFO_CHOSEN_INGREDIENT = 'SET_INFO_CHOSEN_INGREDIENT';
export const DELETE_INFO_CHOSEN_INGREDIENT = 'DELETE_INFO_CHOSEN_INGREDIENT';

export const openIngridientsDetail = (card) => {
    return ({
        type: SET_INFO_CHOSEN_INGREDIENT,
        item: card
    });
}

export const closeIngridientsDetail = () => {

    return ({
        type: DELETE_INFO_CHOSEN_INGREDIENT
    })
}