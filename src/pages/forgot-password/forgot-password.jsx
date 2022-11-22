import React, { useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/authorization';
import { getCookie } from '../../utils/utils';
import ForgotPasswordStyles from './forgot-password.module.css';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const location = useLocation();
	const cookie = getCookie('token');

	const { forgetPassSuccess } = useSelector(state => state.auth);

	const onChangeEmail = e => {
		setEmail(e.target.value);
	}

	const onFormSubmit = e => {
		e.preventDefault();
		dispatch(forgotPassword({ email }));
	}

	if (cookie) {
		return (<Redirect to={location.state?.from || '/'} />);
	}

	return (
		<div className={ForgotPasswordStyles.container}>
			<h2 className={`${ForgotPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
			<form className={ForgotPasswordStyles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<Input
						type={'email'}
						placeholder={'Укажите e-mail'}
						onChange={onChangeEmail}
						value={email}
						name={'email'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<Button type="primary" size="medium">
					{!!forgetPassSuccess
						? (<Redirect to='/reset-password' />)
						: ''
					}
					Восстановить
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
				<Link className={ForgotPasswordStyles.link} to='/login'>Войти</Link>
			</p>
		</div >)
}
