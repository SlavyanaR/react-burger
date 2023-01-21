import { CLOSE_ORDER_INFO_MODAL } from "../action-types/index";
import { TOrderInfoDetailsModalActions } from "../actions/orderInfoDetail";

export type TOrderInfoInitialState = {
	openModal: string | null;
}

const orderInfoInitialState: TOrderInfoInitialState = {
	openModal: null
};

export const orderInfoReducer = (state = orderInfoInitialState, action:TOrderInfoDetailsModalActions):TOrderInfoInitialState => {
	switch (action.type) {
		case CLOSE_ORDER_INFO_MODAL: {
			return {
				...state,
				openModal: '',
			};
		}
		default: {
			return state;
		}
	}
};