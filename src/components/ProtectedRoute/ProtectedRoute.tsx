import React, { FC, ReactNode } from "react";
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/utils';
import { TLocation } from "../../services/types/data";

interface Props {
	children: ReactNode;
	path: string;
	exact?: boolean;
}

export const ProtectedRoute: FC<Props>=({ children, ...rest }) =>{
	const cookie = getCookie('token');
	const location = useLocation();

	return (
		<Route
			{...rest}
			render={() =>
				cookie ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
} 