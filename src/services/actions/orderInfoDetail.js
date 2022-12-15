import { CLOSE_ORDER_INFO_MODAL } from "../action-types/orderInfoDetailTypes";


export const closeOrderInfo = () => {
	return {
		type: CLOSE_ORDER_INFO_MODAL,
	};
}