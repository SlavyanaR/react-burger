import React from 'react';
import OrdersImageStyles from './OrdersImage.module.css';
import propTypes from "prop-types";

export const OrdersImage = ({ image, alt }) => {


	return (
		<div className={OrdersImageStyles.border}>
			<div className={OrdersImageStyles.item}>
				<img className={OrdersImageStyles.image} src={image} alt={alt} />
			</div>
		</div>
	)
}

OrdersImage.propTypes = {
	image: propTypes.string.isRequired,
	alt: propTypes.string.isRequired,
};