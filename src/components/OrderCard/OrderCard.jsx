import React, { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/utils';
import propTypes from "prop-types";
import OrderCardStyles from './OrderCard.module.css';
import { OrdersImage } from '../OrdersImage/OrdersImage';

export const OrderCard = ({ order, status }) => {
	const ingredients = useSelector(store => store.burgerIngredients.ingredients)
	const { createdAt, number, name } = order;

	const MAX_LENGTH = order.ingredients.length;
	const hideIngredients = MAX_LENGTH - 6;

	const orderIngredientsData = useMemo(() => {
		return order?.ingredients.map((id) => {
			return ingredients?.find((item) => {
				return id === item._id
			})
		})
	}, [order?.ingredients, ingredients])


	const orderTotalPrice = useMemo(() => {
		return orderIngredientsData?.reduce((sum, item) => {
			if (item?.type === 'bun') {
				return sum += item.price * 2
			}
			return sum += (item ? item.price : 0);
		}, 0);
	}, [orderIngredientsData])


	return (
		<div className={OrderCardStyles.container}>
			<div className={OrderCardStyles.order_id}>
				<p className="text text_type_digits-default">#{number}</p>
				<p className="text text_type_main-default text_color_inactive">{formatDate(createdAt)}</p>
			</div>
			<div className={OrderCardStyles.info}>
				<h2 className={`${OrderCardStyles.text} text text_type_main-medium`}>{name}</h2>
				{!!status &&
					<p className={`${OrderCardStyles.status} text text_type_main-default`}>
						{status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : status === 'created' ? 'Создан' : 'Выполнен'}
					</p>}
			</div>
			<div className={OrderCardStyles.price}>
				<ul className={OrderCardStyles.list}>
					{orderIngredientsData && MAX_LENGTH <= 5 && orderIngredientsData.map((item, index) => {
						return (
							<li className={OrderCardStyles.items} key={index}>
								{item &&
									<OrdersImage image={item.image} alt={item.name} />}
							</li>
						)
					})}
					{orderIngredientsData && MAX_LENGTH >= 6 && orderIngredientsData.slice(0, 5).map((item, index) => {
						return (
							<li className={OrderCardStyles.items} key={index}>
								{item &&
									<OrdersImage image={item.image} alt={item.name} />}
							</li>
						)
					})}
					{orderIngredientsData && MAX_LENGTH > 6 && orderIngredientsData.slice(5, 6).map((item, index) => {
						return (
							<li className={OrderCardStyles.items} key={index}>
								{item &&
									<>
										<p className={`text text_type_main-default ${OrderCardStyles.hideText}`}>{`+${hideIngredients}`}</p>
										<div className={OrderCardStyles.hidePic}>
											<OrdersImage image={item.image} alt={item.name} />
										</div>
									</>
								}
							</li>
						)
					})}
				</ul>
				<div className={OrderCardStyles.price}>
					<p className='text text_type_digits-default pr-2'>{orderTotalPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div >)
}

OrderCard.propTypes = {
	order: propTypes.object.isRequired,
	status: propTypes.bool,
};