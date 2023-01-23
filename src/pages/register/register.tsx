import React, { ChangeEvent, FC, FormEvent }  from "react";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { registerUser, setRegisterFormValue } from "../../services/actions/auth";
import { getCookie } from "../../utils/utils";
import RegisterStyles from './register.module.css';
import { TLocation } from "../../services/types/data";


export const Register:FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<TLocation>();
    const cookie = getCookie('token');
    const { email, password, name } = useSelector(state => state.auth.form);

    const onChange = (e: ChangeEvent<HTMLInputElement>)  => {
        dispatch(setRegisterFormValue(e.target.name, e.target.value));
    }

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(email, password, name));
    }

    if (cookie) {
        return (<Redirect to={location.state?.from || '/'} />);
    }
    return (
        <div className={RegisterStyles.register}>
            <h2 className={`${RegisterStyles.title} text text_type_main-medium pb-6`}>Регистрация</h2>
            <form className={RegisterStyles.form} onSubmit={onFormSubmit}>
                <div className="pb-6">
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        value={name}
                        name={'name'}
                        error={false}
                        size={'default'}
                    />
                </div>
                <div className="pb-6">
                    <EmailInput onChange={onChange} value={email} name={'email'} size="default" />
                </div>
                <div className="pb-6">
                    <PasswordInput onChange={onChange} value={password} name={'password'} size="default" />
                </div>
                {email && password && name ?
					(<Button type="primary" size="medium">
					Зарегистрироваться
					</Button>)
					: (<Button type="primary" size="medium" disabled>
					Зарегистрироваться
					</Button>)}
            </form>
            <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы?
                <Link className={RegisterStyles.link} to='/login'>Войти</Link>
            </p>
        </div >
    )
}
