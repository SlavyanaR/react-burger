import {
	GET_API_ITEMS_REQUEST,
	GET_API_ITEMS_SUCCESS,
	GET_API_ITEMS_FAILED
} from '../action-types/index';
import {
	SET_LOADING_MODE,
	RESET_LOADING_MODE
}
	from '../action-types/index'
import { TIngredient } from "../types/data";
import { AppDispatch, AppThunk } from '../types';
import { getCards } from '../../utils/Api';

export interface IBurgerIngredientsFailed {
	readonly type: typeof GET_API_ITEMS_FAILED;
}
export interface IBurgerIngredientsRequest {
	readonly type: typeof GET_API_ITEMS_REQUEST;
}
export interface IBurgerIngredientsSuccess {
	readonly type: typeof GET_API_ITEMS_SUCCESS;
	items: Array<TIngredient>;
}
export interface ISetLoadingMode {
	readonly type: typeof SET_LOADING_MODE;
}
export interface IResetLoadingMode {
	readonly type: typeof RESET_LOADING_MODE;
}

export type TBurgerIngredientsActions =
	| IBurgerIngredientsFailed
	| IBurgerIngredientsRequest
	| IBurgerIngredientsSuccess
	
export const getApiItems: AppThunk = () => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_API_ITEMS_REQUEST
		});

		getCards()
			.then((res) => {
				dispatch({
					type: GET_API_ITEMS_SUCCESS,
					items: res.data
				});

			})
			.catch(() => {
				dispatch({
					type: GET_API_ITEMS_FAILED,
				});
			})
	};
}