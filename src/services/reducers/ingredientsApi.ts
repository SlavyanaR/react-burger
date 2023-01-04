import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED
} from "../action-types/index";
import { TBurgerIngredientsActions } from "../actions/ingredientsApi";
import { TIngredient } from "../types/data";

export type TIngredientsInitialState = {
    items: Array<TIngredient>;
    iitemsRequest: boolean;
    itemsFailed: boolean;
}

const initialState: TIngredientsInitialState = {
    items: [],
    iitemsRequest: false,
    itemsFailed: false
};

export const initialItemsReducer = (state = initialState, action: TBurgerIngredientsActions): TIngredientsInitialState => {
    switch (action.type) {
        case GET_API_ITEMS_REQUEST: {
            return {
                ...state,
                iitemsRequest: false,
                itemsFailed: true
            }
        }
        case GET_API_ITEMS_SUCCESS: {
            return {
                ...state,
                items: action.items,
                itemsFailed: true,
                iitemsRequest: false,
            };
        }
        case GET_API_ITEMS_FAILED: {
            return {
                ...state,
                itemsFailed: true,
                iitemsRequest: false
            }
        }
        default: {
            return state
        }
    }
}