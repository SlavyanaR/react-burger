import { combineReducers } from "@reduxjs/toolkit";

import { initialItemsReducer } from "./ingredientsApi";
import { constructorItemsReducer } from "./constructorItems";
import { orderReducer } from "./order";
import { choseIngredientsReducer } from "./choseIngredients";
import { loadingReducer } from "./loading";

export const rootReducer = combineReducers({
    ingredientsApi: initialItemsReducer,
    constructorItems: constructorItemsReducer,
    order: orderReducer,
    choseIngredients: choseIngredientsReducer,
    loading: loadingReducer
})
