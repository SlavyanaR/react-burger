import {
    SET_INFO_CHOSEN_INGREDIENT,
    DELETE_INFO_CHOSEN_INGREDIENT
} from '../action-types/index';


export interface IIngredientCloseModal {
    readonly type: typeof DELETE_INFO_CHOSEN_INGREDIENT;
}

export interface TIngredientOpenModal {
    readonly type: typeof SET_INFO_CHOSEN_INGREDIENT,
}

export type TIngredientModalActions =
    | IIngredientCloseModal
    | TIngredientOpenModal;


export const closeIngridientsDetail = (): IIngredientCloseModal => {

    return ({
        type: DELETE_INFO_CHOSEN_INGREDIENT
    })
}

export const openIngridientsDetail = (): TIngredientOpenModal => {
    return ({
        type: SET_INFO_CHOSEN_INGREDIENT,

    });
}
