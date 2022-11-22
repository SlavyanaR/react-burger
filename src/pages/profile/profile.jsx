import React, { useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { singOut, updateUser } from '../../services/actions/authorization';
import { Orders } from './orders/orders';
import ProfileStyles from './profile.module.css';

export const Profile = () => {
    const dispatch = useDispatch();
    const { email, name } = useSelector(state => state.auth.user);

    const [form, setForm] = useState({
        name: name,
        email: email,
        password: '',
    });
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(form.email, form.name, form.password));
    };

    function handleSingOut() {
        dispatch(singOut());
    };

    const onResetForm = (e) => {
        e.preventDefault();
        setForm({
            email: email,
            name: name,
            password: '',
        })
    }

    return (
        <div className={`${ProfileStyles.profile} pt-30`}>
            <nav className={`${ProfileStyles.container} pr-15`}>
                <ul className={`${ProfileStyles.list}`}>
                    <li className={`${ProfileStyles.item}`}>
                        <NavLink
                            to='/profile'
                            exact
                            className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${ProfileStyles.linkActive} text text_type_main-medium`}
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li className={`${ProfileStyles.item}`}>
                        <NavLink
                            to='/profile/orders'
                            exact
                            className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${ProfileStyles.linkActive} text text_type_main-medium`}
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li className={`${ProfileStyles.item}`}>
                        <NavLink
                            to='/login'
                            exact
                            className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${ProfileStyles.linkActive} text text_type_main-medium`}
                            onClick={handleSingOut}
                        >
                            Выход
                        </NavLink>
                    </li>
                </ul>
                <p className={`${ProfileStyles.text} text text_type_main-default text_color_inactive pt-20 pb-4`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <Switch>
                <Route exact path="/profile/orders">
                    <Orders />
                </Route>
                <Route exact path="/profile">
                    <form className={ProfileStyles.form} onSubmit={onSubmit}>
                        <div className="pb-6">
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={onChange}
                                icon={'EditIcon'}
                                value={form.name}
                                name={'name'}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>
                        <div className="pb-6">
                            <Input
                                type={'email'}
                                placeholder={'Логин'}
                                onChange={onChange}
                                icon={'EditIcon'}
                                value={form.email}
                                name={'email'}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>
                        <div className="pb-6">
                            <Input
                                type={'password'}
                                placeholder={'Пароль'}
                                onChange={onChange}
                                icon={'EditIcon'}
                                value={form.password}
                                name={'password'}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>
                        <Button type="secondary" size="medium" onClick={onResetForm}>
                            Oтмена
                        </Button>
                        <Button disabled={!form.password} type="primary" size="medium">
                            Сохранить
                        </Button>
                    </form>
                </Route>
            </Switch>
        </div >
    )
}
