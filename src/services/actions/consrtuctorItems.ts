import {
	ADD_INGREDIENT_TO_CONSTRUCTOR,
	ADD_BUN_IN_CONSTRUCTOR,
	SORT_INGREDIENTS_IN_CONSTRUCTOR,
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	RESET_INGREDIENTS_IN_CONSTRUCTOR
} from '../action-types/index';
import { TIngredient } from '../types/data';

export interface IAddBun {
	readonly type: typeof ADD_BUN_IN_CONSTRUCTOR;
	data: TIngredient;
	itemsId: string[];

}

export interface IAddItems {
	readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
	data: TIngredient;
}

export interface IDeleteItem {
	readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
	data: TIngredient;
	id: string;
}

export interface IMoveItem {
	data: {
		dragIndex: number;
		hoverIndex: number;
	};
	readonly type: typeof SORT_INGREDIENTS_IN_CONSTRUCTOR;
}

export interface IResetItem {
	readonly type: typeof RESET_INGREDIENTS_IN_CONSTRUCTOR;
	data: TIngredient[];
}

export type TBurgerConstructorActions =
	| IAddBun
	| IAddItems
	| IDeleteItem
	| IMoveItem
	| IResetItem;