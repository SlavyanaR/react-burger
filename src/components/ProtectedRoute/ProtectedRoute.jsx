import React from "react";
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/utils';

export function ProtectedRoute({ children, ...rest }) {
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