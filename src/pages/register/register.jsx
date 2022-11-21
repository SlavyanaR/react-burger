import React from "react";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import RegisterStyles from './register.module.css';


export default Register = () => {

    return (
        <div className={RegisterStyles.container}>
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
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы?
                <Link className={RegisterStyles.link} to='/login'>Войти</Link>
            </p>
        </div >
    )
}