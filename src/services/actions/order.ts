import {
	RESET_ORDER_NUMBER,
	POST_CONSTRUCTOR_ITEMS_FAILED,
	POST_CONSTRUCTOR_ITEMS_SUCCESS,
	POST_CONSTRUCTOR_ITEMS_REQUEST
}
	from '../action-types/index';
import { SET_LOADING_MODE, RESET_LOADING_MODE } from "./loading";
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

export function closePopup() {
	return {
		type: RESET_ORDER_NUMBER,
	};
}

export const postOrder: AppThunk = (orderList: Array<string>) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: POST_CONSTRUCTOR_ITEMS_REQUEST
		});
		dispatch({
			type: SET_LOADING_MODE
		})
		postOrderRequest(orderList)
			.then(res => {
				if (res && res.success) {
					dispatch({
						type: POST_CONSTRUCTOR_ITEMS_SUCCESS,
						number: res.order.number
					})
					dispatch({
						type: RESET_INGREDIENTS_IN_CONSTRUCTOR
					});
				} else {
					dispatch({
						type: POST_CONSTRUCTOR_ITEMS_FAILED,
						error: res
					});
				}
				dispatch({
					type: RESET_LOADING_MODE
				})
			})
			.catch(err => {
				dispatch({
					type: POST_CONSTRUCTOR_ITEMS_FAILED,
					error: err
				});
			})
	}
}