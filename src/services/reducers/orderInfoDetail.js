import { CLOSE_ORDER_INFO_MODAL } from "../action-types/orderInfoDetailTypes";



const orderInfoInitialState = {
	openModal: null
};

export const orderInfoReducer = (state = orderInfoInitialState, action) => {
	switch (action.type) {
		case CLOSE_ORDER_INFO_MODAL: {
			return {
				...state,
				openModal: null,
			};
		}
		default: {
			return state;
		}
	}
};