import {
    SET_INFO_CHOSEN_INGREDIENT,
    DELETE_INFO_CHOSEN_INGREDIENT
} from "../action-types/index";
import { TIngredientModalActions } from "../actions/chosenIngredient";
import { TIngredient } from "../types/data";

export type TIngredientInitialState = {
    openModal: TIngredient | string | null;
}

const initialState: TIngredientInitialState = {
    openModal: null
};

export const chosenIngredientReducer = (state = initialState, action: TIngredientModalActions): TIngredientInitialState => {
    switch (action.type) {

        case DELETE_INFO_CHOSEN_INGREDIENT: {
            return {
                ...state,
                openModal: null,
            }
        }

        default: {
            return state
        }
    }
}
