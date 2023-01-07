import { AppDispatch, AppThunk } from "../types";
import { postOrderRequest } from "../../utils/Api";
import {
	RESET_ORDER_NUMBER,
	POST_CONSTRUCTOR_ITEMS_REQUEST,
	POST_CONSTRUCTOR_ITEMS_SUCCESS,
	POST_CONSTRUCTOR_ITEMS_FAILED
}
	from '../action-types/index';
import {
	SET_LOADING_MODE,
	RESET_LOADING_MODE
} from "../action-types/index";
import { RESET_INGREDIENTS_IN_CONSTRUCTOR } from "../action-types/index";

export interface IOrderDetailsModal {
	readonly type: typeof RESET_ORDER_NUMBER;
}

export interface IOrderDetailsFailed {
	readonly type: typeof POST_CONSTRUCTOR_ITEMS_FAILED;
}

export interface IOrderDetailsRequest {
	readonly type: typeof POST_CONSTRUCTOR_ITEMS_REQUEST;
}

export interface IOrderDetailsSuccess {
	readonly type: typeof POST_CONSTRUCTOR_ITEMS_SUCCESS;
	readonly number: number;
}

export type TOrderDetailsActions =
	| IOrderDetailsModal
	| IOrderDetailsFailed
	| IOrderDetailsRequest
	| IOrderDetailsSuccess;

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
