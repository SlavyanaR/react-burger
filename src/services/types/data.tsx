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