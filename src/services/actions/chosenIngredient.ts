import { SET_INFO_CHOSEN_INGREDIENT,
    DELETE_INFO_CHOSEN_INGREDIENT
 } from "../action-types/index";

 export interface IIngredientCloseModal {
	readonly type: typeof DELETE_INFO_CHOSEN_INGREDIENT;
}

export interface IIngredientOpenModal {
    item: string;
    readonly type: typeof SET_INFO_CHOSEN_INGREDIENT
}

export type TIngredientModalActions =
	| IIngredientCloseModal
    | IIngredientOpenModal;

export const openIngridientsDetail = (card: string) => {
    return ({
        type: SET_INFO_CHOSEN_INGREDIENT,
        item: card
    });
}

export const closeIngridientsDetail = (): IIngredientCloseModal=> {

    return ({
        type: DELETE_INFO_CHOSEN_INGREDIENT
    })
}