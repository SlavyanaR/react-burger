import {
	POST_CONSTRUCTOR_ITEMS_REQUEST,
	POST_CONSTRUCTOR_ITEMS_SUCCESS,
	POST_CONSTRUCTOR_ITEMS_FAILED,
	RESET_ORDER_NUMBER
}
	from '../action-types/orderTypes';

	import { postOrderRequest } from '../../utils/Api'; 

export function closePopup() {
	return {
		type: RESET_ORDER_NUMBER,
	};
}

