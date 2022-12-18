import {
    POST_CONSTRUCTOR_ITEMS_REQUEST,
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED,
    RESET_ORDER_NUMBER
} from "../action-types/orderTypes";

const initialState = {
    number: null,
    orderDetailsFailed: false,
    orderDetailsRequest: false
};

export const orderReducer = (state = initialState, action) => {
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
                ...state.order,
                number: null,
            }
        }
        default: {
            return state
        }
    }
}