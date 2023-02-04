import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED
} from "../action-types/index";
import { TIngredient } from "../types/data";
import { TBurgerIngredientsActions } from "../actions/ingredientsApi";

export type TIngredientsState = Array<TIngredient>;
const initialState: TIngredientsState = [];

export const initialItemsReducer = (state = initialState, action: TBurgerIngredientsActions) => {
    switch (action.type) {
        case GET_API_ITEMS_REQUEST: {
            return state
        }
        case GET_API_ITEMS_SUCCESS: {
            return [
                ...action.items
            ]
        }
        case GET_API_ITEMS_FAILED: {
            return state
        }
        default: {
            return state
        }
    }
}