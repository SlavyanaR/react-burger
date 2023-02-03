import { getCards } from "../../utils/Api";
import { TIngredient } from "../types/data";
import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED,
} from '../action-types/index';

import { AppDispatch, AppThunk } from "../types";

export interface IApiItemsFailed {
    readonly type: typeof GET_API_ITEMS_FAILED;
}

export interface IApiItemsRequest {
    readonly type: typeof GET_API_ITEMS_REQUEST;
}

export interface IApiItemsSuccess {
    readonly type: typeof GET_API_ITEMS_SUCCESS;
    items: Array<TIngredient>;
}

export type TBurgerIngredientsActions =
    | IApiItemsFailed
    | IApiItemsRequest
    | IApiItemsSuccess;

export const getApiItems: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_API_ITEMS_REQUEST
        });
        getCards()
            .then(res => {

                dispatch({
                    type: GET_API_ITEMS_SUCCESS,
                    items: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_API_ITEMS_FAILED,
                });
            })
    };
}

