import {
    SET_INFO_CHOSEN_INGREDIENT,
    DELETE_INFO_CHOSEN_INGREDIENT
} from "../actions/choseIngredients";

const initialState = {};

export const choseIngredientsReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case SET_INFO_CHOSEN_INGREDIENT: {
            debugger
            return action.item

        }
        case DELETE_INFO_CHOSEN_INGREDIENT: {
            return initialState
        }

        default: {
            return state
        }
    }
}
