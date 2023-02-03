import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_BUN_IN_CONSTRUCTOR,
    SORT_INGREDIENTS_IN_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    RESET_INGREDIENTS_IN_CONSTRUCTOR
} from "../action-types/constructorItemsTypes";
import { TBurgerConstructorActions, IAddItems } from "../actions/consrtuctorItems";
import { TIngredient } from "../types/data";

export type TInitialState = {
    items: TIngredient[];
    bun: TIngredient;
    idList: string[];
    bunRequestSuccess: boolean;
}

const initialState: TInitialState = {
    items: [],
    bun: {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: '',
        image_large: '',
        image_mobile: '',
        name: '',
        price: 0,
        proteins: 0,
        type: "bun",
        __v: 0,
        _id: '',
        id: '',
        count: 0,
    },
    bunRequestSuccess: false,
    idList: [],
}

export const constructorItemsReducer = (
    state = initialState,
    action: TBurgerConstructorActions):
    TInitialState => {
    switch (action.type) {
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
				...state,
				items: [...state.items].filter(
					(item) => {
						return item.id !== action.id;
					}
				),
			};
        }

        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
				...state,
				items: [...state.items, action.data],
				idList: [...state.idList, action.data._id]
			};
        }
        case ADD_BUN_IN_CONSTRUCTOR: {
            return {
				...state,
				bun: action.data,
				idList: [...state.idList, action.data._id],
				bunRequestSuccess: true,
			};
        }
        case SORT_INGREDIENTS_IN_CONSTRUCTOR: {
            const dragConstructor = [...state.items];
			dragConstructor.splice(
				action.data.dragIndex,
				0,
				dragConstructor.splice(action.data.hoverIndex, 1)[0]
			);

			return {
				...state,
				items: dragConstructor
			};
        }

                default: {
            return state
        }
    }
}
