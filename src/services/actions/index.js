import { getCards, postOrderRequest  } from "../../utils/Api";
import { GET_API_ITEMS_REQUEST, GET_API_ITEMS_SUCCESS, GET_API_ITEMS_FAILED, } from "./ingredientsApi";
import { RESET_INGREDIENTS_IN_CONSTRUCTOR } from "./constructorItems";
import { POST_CONSTRUCTOR_ITEMS_SUCCESS, POST_CONSTRUCTOR_ITEMS_FAILED, POST_CONSTRUCTOR_ITEMS_REQUEST} from "../action-types/orderTypes";
import { SET_LOADING_MODE, RESET_LOADING_MODE } from "./loading";


export function getApiItems() {
    return function (dispatch) {
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

export function postOrder (orderList)  {
      return function (dispatch) {
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