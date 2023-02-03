import { getCookie } from "./utils";
import { TCardsResponse, TPostOrderResponse, TUserLogoutResponse, TUserResponce } from "../services/types/data";

export const config = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json'
	}
}

export const getCards = async () => {
	return (await fetch(`${config.baseUrl}/ingredients`, {
		headers: config.headers
	})
		.then(res => checkRes<TCardsResponse>(res)))
}

export const checkRes = <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

export const postOrderRequest = async (orderList: string[]) => {
	return (await fetch(`${config.baseUrl}/orders`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token')
		},
		method: 'POST',
		body: JSON.stringify({ ingredients: orderList })
	})
		.then(res => checkRes<TPostOrderResponse>(res)))
}
export const forgotPassRequest = async (email:string) => {
	return await fetch(`${config.baseUrl}/password-reset`, {
		method: 'POST',
		body: JSON.stringify(
			email
		),
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
		.then(res => checkRes<TUserResponce>(res));
}

export const getUserRequest = async () => {
	return await fetch(`${config.baseUrl}/auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
	})
		.then(res => checkRes<TUserResponce>(res));
}

export const loginRequest = async (email: string, password: string) => {
	return await fetch(`${config.baseUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then(res => checkRes<TUserResponce>(res));
}

export const logoutRequest = async () => {
	return await fetch(`${config.baseUrl}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(res => checkRes<TUserLogoutResponse>(res));
}

export const resetPassRequest = async (password: string, token: string | any) => {
	return await fetch(`${config.baseUrl}/password-reset/reset`, {
		method: 'POST',
		body: JSON.stringify(
			password,
			token,
		),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => checkRes<TUserResponce>(res));
}

export const updateUserRequest = async (email: string, name: string, password: string) => {
	return await fetch(`${config.baseUrl}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			email: email,
			name: name,
			password: password,
		}),
	})
		.then(res => checkRes<TUserResponce>(res));
}

export const updateTokenRequest = async () => {
	return await fetch(`${config.baseUrl}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(res => checkRes<TUserResponce>(res));
}

export const resgisterUserRequest = async (email: string, password: string, name: string) => {
	return await fetch(`${config.baseUrl}/auth/register`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
		headers: config.headers,
	})
		.then(res => checkRes<TUserResponce>(res));
}