import { CLOSE_ORDER_INFO_MODAL } from "../action-types/order-info-detailsTypes";


export const closeOrderInfo = () => {
    return {
        type: CLOSE_ORDER_INFO_MODAL,
    };
}