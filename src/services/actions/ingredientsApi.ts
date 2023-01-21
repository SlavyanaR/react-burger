import { getCards } from "../../utils/Api";
import { TIngredient } from "../types/data";
import {
    SET_LOADING_MODE,
    RESET_LOADING_MODE
} from "../action-types/index";

import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED,
} from '../action-types/index';

import { AppDispatch, AppThunk } from "../types";

export interface IApiItemsFailed {
    error(error: any): unknown;
    readonly type: typeof GET_API_ITEMS_FAILED;
}

export interface IApiItemsRequest {
    readonly type: typeof GET_API_ITEMS_REQUEST;
}

export interface IApiItemsSuccess {
    items: any;
    readonly type: typeof GET_API_ITEMS_SUCCESS;
    ingredients: Array<TIngredient>;
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
        dispatch({
            type: SET_LOADING_MODE
        })
        getCards()
            .then(res => {
                dispatch({
                    type: RESET_LOADING_MODE
                })
                if (res && res.success) {
                    dispatch({
                        type: GET_API_ITEMS_SUCCESS,
                        items: res.data
                    });
                } else {
                    dispatch({
                        type: GET_API_ITEMS_FAILED,
                        error: res
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_API_ITEMS_FAILED,
                    error: err
                });
            })
    };
}

