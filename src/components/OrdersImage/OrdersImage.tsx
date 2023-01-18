import React, { FC } from 'react';
import OrdersImageStyles from './OrdersImage.module.css';

type TOrdersImage = {
	image: string;
	alt: string;
}

export const OrdersImage: FC<TOrdersImage> = ({ image, alt }) => {

	return (
		<div className={OrdersImageStyles.border}>
			<div className={OrdersImageStyles.item}>
				<img className={OrdersImageStyles.image} src={image} alt={alt} />
			</div>
		</div>
	)
}

