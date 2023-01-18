import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import NotFound404styles from './non-found-404.module.css';

export const NotFound404: FC = () => {

	return (
		<div className={`${NotFound404styles.container} pt-30 pb-30`}>
			<p className="text text_type_digits-large">404</p>
			<p className="text text_type_main-medium">Страница не найдена</p>
			<Link to='/' className={`${NotFound404styles.link} text text_type_main-medium text_color_inactive pt-10`}>Перейти на главную страницу</Link>
		</div >
	)
}
