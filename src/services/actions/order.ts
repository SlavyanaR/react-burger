import {
	RESET_ORDER_NUMBER,
	POST_CONSTRUCTOR_ITEMS_FAILED,
	POST_CONSTRUCTOR_ITEMS_SUCCESS,
	POST_CONSTRUCTOR_ITEMS_REQUEST,
}
	from '../action-types/index';
//import { SET_LOADING_MODE, RESET_LOADING_MODE } from "./loading";
import { RESET_INGREDIENTS_IN_CONSTRUCTOR } from "../action-types/constructorItemsTypes";
import { postOrderRequest } from '../../utils/Api';
import { AppDispatch, AppThunk } from '../types';

export interface IResetOrderNumberModal {
	readonly type: typeof RESET_ORDER_NUMBER;
}

export interface IPostConstructorItemFailed {
	readonly type: typeof POST_CONSTRUCTOR_ITEMS_FAILED;
}

export interface IPostConstructorItemRequest {
	readonly type: typeof POST_CONSTRUCTOR_ITEMS_REQUEST;
}

export interface IPostConstructorItemSuccess {
	readonly type: typeof POST_CONSTRUCTOR_ITEMS_SUCCESS;
	readonly number: number;
}

export type TOrderDetailsActions =
	| IResetOrderNumberModal
	| IPostConstructorItemFailed
	| IPostConstructorItemRequest
	| IPostConstructorItemSuccess;

export interface IIngredientCloseModal {
	readonly type: typeof RESET_INGREDIENTS_IN_CONSTRUCTOR;
}

export type TIngredientModalActions =
	| IIngredientCloseModal;


export const closePopup = (): TIngredientModalActions => {
	return {
		type: RESET_INGREDIENTS_IN_CONSTRUCTOR,
	};
}

export const postOrder: AppThunk = (orderList: Array<string>) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: POST_CONSTRUCTOR_ITEMS_REQUEST
		});
		postOrderRequest(orderList)
			.then(res => {
				if (res && res.success) {
					dispatch({
						type: POST_CONSTRUCTOR_ITEMS_SUCCESS,
						number: res.order.number
					})
					
				} else {
					dispatch({
						type: POST_CONSTRUCTOR_ITEMS_FAILED,
						error: res
					});
				}
			})
			.catch(err => {
				dispatch({
					type: POST_CONSTRUCTOR_ITEMS_FAILED,
					error: err
				});
			})
	}
}