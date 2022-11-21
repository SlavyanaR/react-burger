import { getCookie } from "./utils";

export const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

export async function getCards() {
    return (await fetch(`${config.baseUrl}/ingredients`, {
        headers: config.headers
    })
        .then(checkRes))
}

function checkRes(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export async function postOrderRequest(orderList) {
    return (await fetch(`${config.baseUrl}/orders`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({ ingredients: orderList })
    })
        .then(checkRes))
}
export const forgotPassRequest = async email => {
    return await fetch(`${config.baseUrl}password-reset`, {
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
        .then(checkRes);
}

export const getUserRequest = async () => {
    return await fetch(`${config.baseUrl}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
    })
        .then(checkRes);
}

export const loginRequest = async (email, password) => {
    return await fetch(`${config.baseUrl}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(checkRes);
}

export const logoutRequest = async () => {
    return await fetch(`${config.baseUrl}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(checkRes);
}

export const resetPassRequest = async (password, token) => {
    return await fetch(`${config.baseUrl}password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(
            password,
            token,
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkRes);
}

export const updateUserRequest = async (email, name, password) => {
    return await fetch(`${config.baseUrl}auth/user`, {
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
        .then(checkRes);
}

export const updateTokenRequest = async () => {
    return await fetch(`${config.baseUrl}auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(checkRes);
}

export const resgisterUserRequest = async (email, password, name) => {
    return await fetch(`${config.baseUrl}auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkRes);
}