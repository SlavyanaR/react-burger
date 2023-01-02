import { ReactNode } from "react";

export type TWsSocketMiddlewareActions = {
	wsInit: string;
	wsSendMessage: string;
	onOpen: string;
	onClose: string;
	onError: string;
	onMessage: string;
}

export type TUser = {
	email: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}

export type TUserResponce = {
	success: boolean;
	user: TUser;
	accessToken: string;
	refreshToken: string;
	message: string;
}