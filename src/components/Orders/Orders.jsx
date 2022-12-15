import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import OrdersStyles from './Orders.module.css';
import { OrderCard } from '../OrderCard/OrderCard';

export const Orders = () => {
	const location = useLocation();
	const orders = useSelector(store => store.wsFeed.orders);

	return (
		<div className={OrdersStyles.container}>
			{orders && orders.map((order, index) => {
				return (
					<Link
						to={{ pathname: `/feed/${order._id}`, state: { background: location } }}
						className={`${OrdersStyles.link}`} key={order._id}
					>
						<OrderCard order={order} status={false} key={index} />
					</Link>
				)
			})}
		</div >
	)
}