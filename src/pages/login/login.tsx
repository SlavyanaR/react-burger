import React, { ChangeEvent, FC, FormEvent }  from 'react';
import { Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { setLoginFormValue, singIn } from '../../services/actions/auth';
import { getCookie } from '../../utils/utils';
import LoginStyles from './login.module.css';
import { TLocation } from '../../services/types/data';

export const Login: FC = () => {
	const dispatch = useDispatch();
	const location = useLocation<TLocation>();
	const cookie = getCookie('token');
	const { email, password } = useSelector(state => state.auth.form);


	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setLoginFormValue(e.target.name, e.target.value));
	}

	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(singIn(email, password));
	}


	if (cookie) {
		return (<Redirect to={location.state?.from || '/'} />);
	}

	return (
		<div className={LoginStyles.login}>
			<h2 className={`${LoginStyles.title} text text_type_main-medium pb-6`}>Вход</h2>
			<form className={LoginStyles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<EmailInput onChange={onChange} value={email} name={'email'} size="default" />
				</div>
				<div className="pb-6">
					<PasswordInput onChange={onChange} value={password} name={'password'} size="default" />
				</div>
				{email && password ?
				(<Button type="primary" size="medium">
					Войти
				</Button>)
					: (<Button type="primary" size="medium" disabled>
						Войти
					</Button>)}

			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вы — новый пользователь?
				<Link className={LoginStyles.link} to='/register'>Зарегистрироваться</Link>
			</p>
			<p className="text text_type_main-default text_color_inactive">Забыли пароль?
				<Link className={LoginStyles.link} to='/forgot-password'>Восстановить пароль</Link>
			</p>
		</div >)
}
