import {
    POST_CONSTRUCTOR_ITEMS_REQUEST,
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED,
    RESET_ORDER_NUMBER
} from "../action-types/index";
import { TOrderDetailsActions } from "../actions/order";

export type TOrderInitialState = {
    orderDetailsFailed: boolean;
    number: number | null;
    orderDetailsRequest: boolean;
}

const initialState: TOrderInitialState = {
    number: null,
    orderDetailsFailed: false,
    orderDetailsRequest: false
};

export const orderReducer = (state = initialState, action: TOrderDetailsActions): TOrderInitialState => {
    switch (action.type) {
        case POST_CONSTRUCTOR_ITEMS_REQUEST: {
            return {
                ...state,
                orderDetailsFailed: false,
                orderDetailsRequest: true
            };
        }
        case POST_CONSTRUCTOR_ITEMS_SUCCESS: {
            return {
                ...state,
                number: action.number,
                orderDetailsRequest: false,
                orderDetailsFailed: false
            }
        }
        case POST_CONSTRUCTOR_ITEMS_FAILED: {

            return {
                ...state,
                orderDetailsFailed: true,
                orderDetailsRequest: false
            };
        }
        case RESET_ORDER_NUMBER: {
            return {
                ...state,
                number: null,
            }
        }
        default: {
            return state
        }
    }
}