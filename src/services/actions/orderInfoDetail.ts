import { CLOSE_ORDER_INFO_MODAL } from "../action-types/index";

export interface IOrderInfoDetailsCloseModal {
	readonly type: typeof CLOSE_ORDER_INFO_MODAL;
}

export type TOrderInfoDetailsModalActions =
	| IOrderInfoDetailsCloseModal;

export const closeOrderInfo = (): IOrderInfoDetailsCloseModal => {
	return {
		type: CLOSE_ORDER_INFO_MODAL,
	};
}