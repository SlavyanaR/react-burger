import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { OrderCard } from '../../../components/OrderCard/OrderCard';
import OrdersStyles from './orders.module.css';

export const Orders = () => {
	const location = useLocation();
	const orders = useSelector(store => store.wsAuthFeed.orders)

	return (
		<div className={OrdersStyles.container}>
			{orders &&
				(orders?.map((order) => {
					return (
						<Link
							to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }}
							className={`${OrdersStyles.link}`} key={order._id}
						>
							<OrderCard order={order} status={true} />
						</Link>
					)
				}))
			}
		</div >
	)
}
