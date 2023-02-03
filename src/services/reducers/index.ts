import { combineReducers } from "@reduxjs/toolkit";
import { initialItemsReducer } from "./ingredientsApi";
import { constructorItemsReducer } from "./constructorItems";
import { orderReducer } from "./order";
import { chosenIngredientReducer } from "./chosenIngredient";
//import { loadingReducer } from "./loading";
import { authReducer } from "./auth";
import { wsAuthReducer } from "./wsAuthReducer";
import { wsReducer } from "./wsReducer";
import { orderInfoReducer } from "./orderInfoDetail";

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredientsApi: initialItemsReducer,
    constructorItems: constructorItemsReducer,
    chosenIngredient: chosenIngredientReducer,
//    loading: loadingReducer,
    auth: authReducer,
    wsFeed: wsReducer,
	wsAuthFeed: wsAuthReducer,
    orderInfo: orderInfoReducer,
})
