import React from 'react';
import { useSelector } from 'react-redux';
//import uniqid from 'uniqid';
import { v4 as uuidv4 } from 'uuid';
import OrdersStatusStyles from './OrdersStatus.module.css';

export const OrdersStatus = () => {
	const { total, totalToday, orders } = useSelector(store => store.wsFeed);

	const doneStatusOrder = orders.filter(order => order.status === 'done').filter((order, index) => index < 15);
	const pendingStatusOrder = orders.filter(order => order.status !== 'done').filter((order, index) => index >= 10)

	const ItemId = uuidv4();

	return (
		<div className={OrdersStatusStyles.container}>
			<div className={`${OrdersStatusStyles.board} pb-15`}>
				<div className={OrdersStatusStyles.column}>
					<p className='text text_type_main-medium pb-6'>Готовы:</p>
					<ul className={OrdersStatusStyles.list}>
						{doneStatusOrder.map((order, index) => {
							return (
								<li className={`${OrdersStatusStyles.item} ${OrdersStatusStyles.done} text text_type_digits-default`} key={ItemId + index}>{order.number}</li>)
						})}
					</ul>
				</div>
				<div className={OrdersStatusStyles.column}>
					<p className='text text_type_main-medium pb-6'>В работе:</p>
					<ul className={OrdersStatusStyles.list}>
						{pendingStatusOrder.map((order, index) => {
							return (
								<li className={`${OrdersStatusStyles.item} text text_type_digits-default`} key={ItemId + index}>{order.number}</li>)
						})}
					</ul>
				</div>
			</div>
			<div className={`${OrdersStatusStyles.completed} pb-15`}>
				<p className='text text_type_main-medium'>Выполнено за все время:</p>
				<h2 className={`${OrdersStatusStyles.total} text text_type_digits-large`}>{total}</h2>
			</div>
			<div className={OrdersStatusStyles.completed}>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<h2 className={`${OrdersStatusStyles.total} text text_type_digits-large`}>{totalToday}</h2>
			</div>
		</div >)
}