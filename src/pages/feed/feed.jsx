import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/wsAction';
import { Orders } from '../../components/Orders/Orders'; 
import { OrdersStatus } from '../../components/OrdersStatus/OrdersStatus';
import FeedStyles from './feed.module.css';



export const Feed = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionOpen());
		return () => {
			dispatch(wsConnectionClosed());
		}
	}, [dispatch]);

	return (
		<div className={FeedStyles.container}>
			<h2 className={`${FeedStyles.text} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
			<div className={FeedStyles.feedOrder}>
				<Orders />
				<OrdersStatus />
			</div>
		</div >)
}