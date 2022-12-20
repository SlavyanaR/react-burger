import React, { useEffect, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import OrderInfoStyles from './OrderInfo.module.css';
import { OrdersInfoDetails } from '../OrderInfoDetails/OrderInfoDetails';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/wsAction';
import { wsAuthConnectionClosed, wsAuthConnectionOpen } from '../../services/actions/wsAuthAction';
import { formatDate } from '../../utils/utils';

export const OrdersInfo = () => {
	const dispatch = useDispatch();

	let { id } = useParams();
	let match = useRouteMatch();
	const isProfile = '/profile/orders/:id';
	const isFeed = '/feed/:id';

	const allOrders = useSelector(store => store.wsFeed.orders);
	const authOrders = useSelector(store => store.wsAuthFeed.orders);
	const items = useSelector(store => store.ingredientsApi)

	let orders = match.path === isProfile ? authOrders : allOrders;
	let order = orders?.find((order) => order._id === id);


	const orderIngredientsData = useMemo(() => {
		return order?.ingredients.map((id) => {
			return items?.find((item) => {
				return id === item._id
			})
		})
	}, [order?.ingredients, items])

	const orderTotalPrice = useMemo(() => {
		return orderIngredientsData?.reduce((sum, item) => {
			if (item?.type === 'bun') {
				return sum += item.price * 2
			}
			return sum += (item ? item.price : 0);
		}, 0);
	}, [orderIngredientsData])

	useEffect(() => {
		if (!order) {
			if (match.path === isProfile) {
				dispatch(wsAuthConnectionOpen());
			}
			if (match.path === isFeed) {
				dispatch(wsConnectionOpen());
			}
		}
		return () => {
			if (match.path === isProfile) {
				dispatch(wsAuthConnectionClosed());
			}
			if (match.path === isFeed) {
				dispatch(wsConnectionClosed());
			}
		}
	}, [dispatch, order, match.path, match.url]);

	return (
		<>
			{
				order && (
					<div className={OrderInfoStyles.container}>
						<p className='text text_type_digits-default'>#{order.number}</p>
						<h2 className={`${OrderInfoStyles.name} text text_type_main-medium pt-10`}>{order.name}</h2>
						{!!order.status &&
							<p className={`${OrderInfoStyles.status} text text_type_main-default pt-3`}>
								{order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}
							</p>}
						<h3 className={`${OrderInfoStyles.order} text text_type_main-medium pt-15`}>Состав:</h3>
						<ul className={`${OrderInfoStyles.list}`}>
							<OrdersInfoDetails details={orderIngredientsData} key={id} />
						</ul>
						<div className={`${OrderInfoStyles.total} pb-10`}>
							<p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
							<div className={OrderInfoStyles.price}>
								<p className='text text_type_digits-default pr-2'>{orderTotalPrice}</p>
								<CurrencyIcon type="primary" key={uuidv4()} />
							</div>
						</div>
					</div >
				)}
		</>
	)
}
