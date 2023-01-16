import React, { FC, useMemo } from 'react';
import OrderInfoDetailsStyles from './OrderInfoDetails.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { OrdersImage } from '../OrdersImage/OrdersImage';
import { TIngredient } from '../../services/types/data';

type TOrdersInfoDetails = {
	details: TIngredient[];
}

export const OrdersInfoDetails: FC<TOrdersInfoDetails> = ({ details }) => {
	const items = useSelector(store => store.ingredientsApi);

	const count = (elem: object) => {
		let count = details.filter((item) => {
			return item === elem;
		}).length
		return count
	}

	const orderIngredient = useMemo(() => {
		return details?.map((elem) => {
			return items?.find((item) => {
				return elem._id === item._id
			})
		})
	}, [details, items]);

	return (
		<div className={OrderInfoDetailsStyles.container}>
			{orderIngredient && [...new Set(orderIngredient)].map((item) => {
				return (
					<li className={`${OrderInfoDetailsStyles.item} pb-3`} key={uuidv4()}>
						{item && (
							<>
								<div className={OrderInfoDetailsStyles.info}>
									<OrdersImage image={item.image} alt={item.name} key={uuidv4()} />
									<p className={`${OrderInfoDetailsStyles.text} text text_type_main-default pl-4`}>{item.name}</p>
								</div>
								<div className={OrderInfoDetailsStyles.price}>
									<p className='text text_type_digits-default pr-2'> {count(item)} x {item.type === 'bun' ? item.price * 2 : item.price}</p>
									<CurrencyIcon type="primary" key={uuidv4()} />
								</div>
							</>
						)}
					</li>
				)
			})}
		</div>
	)
}
