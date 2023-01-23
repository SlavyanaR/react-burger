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
	readonly item: TIngredient,
	readonly key: string
	
}

export interface IAddItems {
	readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
	readonly item: TIngredient,
}

export interface IDeleteItem {
	readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
	readonly ingredients: Array<TIngredient>,
	readonly id: string
}

export interface IMoveItem {
    readonly draggedIndex: number,
    readonly droppedIndex: number,
	readonly item: TIngredient,
	readonly type: typeof SORT_INGREDIENTS_IN_CONSTRUCTOR;
}

export interface IResetItem {
	readonly type: typeof  RESET_INGREDIENTS_IN_CONSTRUCTOR;
	readonly ingredients: Array<TIngredient>,
}

export type TBurgerConstructorActions =
	| IAddBun
	| IAddItems
	| IDeleteItem
	| IMoveItem
	| IResetItem;