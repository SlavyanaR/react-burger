import {
	WS_AUTH_CONNECTION_SUCCESS,
	WS_AUTH_CONNECTION_ERROR,
	WS_AUTH_CONNECTION_CLOSED,
	WS_AUTH_GET_ORDERS,
	WS_AUTH_SEND_ORDERS,
	WS_AUTH_CONNECTION_START
} from '../action-types';

export const wsAuthConnectionSuccess = () => {
	return {
		type: WS_AUTH_CONNECTION_SUCCESS
	};
};

export const wsAuthConnectionOpen = () => {
	return {
		type: WS_AUTH_CONNECTION_START
	}
}

export const wsAuthConnectionError = () => {
	return {
		type: WS_AUTH_CONNECTION_ERROR
	};
};

export const wsAuthConnectionClosed = () => {
	return {
		type: WS_AUTH_CONNECTION_CLOSED
	};
};

export const wsAuthGetMessage = order => {
	return {
		type: WS_AUTH_GET_ORDERS,
		payload: order
	};
};

export const wsAuthSendMessage = order => {
	return {
		type: WS_AUTH_SEND_ORDERS,
		payload: order
	};
};