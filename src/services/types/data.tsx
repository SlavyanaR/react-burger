import { ReactNode } from "react";

export type TLocation = {
	background: {
		pathname: string;
		search: string;
		hash: string;
		state: null;
		key: string;
	}
	from: string;
	state?: object;
};

export type TModal = {
	title: string;
	children: ReactNode;
	onClose: () => void;
}

export type TModalOverlay = {
	onClick: () => void;
}

export type TIngredient = {
	calories: number;
	carbohydrates: number;
	fat: number;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	price: number;
	proteins: number;
	type: "bun" | "main" | "sauce";
	__v: number;
	_id: string;
	id?: string;
	count?: number;
}

export type TIngredientResponse = {
	data: Array<TIngredient>;
	success: boolean;
}

export type TUser = {
	email: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}

export type TOrder = {
	createdAt: string;
	ingredients: TIngredient[];
	name: string;
	number: number;
	owner: TUser;
	price: number;
	status: string;
	updatedAt: string;
	_id: string;
}


export type TOrderDetailsResponse = {
	name: string
	order: TOrder;
	success: boolean;
}

export type TUserLogoutResponse = {
	message: string;
	success: boolean;
	refreshToken: string;
}

export type TUserResponce = {
	success: boolean;
	user: TUser;
	accessToken: string;
	refreshToken: string;
	message: string;
}

