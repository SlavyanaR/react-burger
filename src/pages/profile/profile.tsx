import React, { useState, useEffect, FC, ChangeEvent, FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { NavLink, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { singOut, updateUser, getUser } from '../../services/actions/auth';
import { Orders } from './orders/orders';
import { OrdersInfo } from '../../components/OrderInfo/OrderInfo';
import { wsAuthConnectionClosed, wsAuthConnectionOpen } from '../../services/actions/wsAuthAction';
import ProfileStyles from './profile.module.css';
import { TLocation } from '../../services/types/data';

export const Profile: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<TLocation>();
    const matchOrderDetails = !!useRouteMatch({ path: '/profile/orders/:id' });
    const background = location.state?.background;
    const { email, name } = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(getUser());
        dispatch(wsAuthConnectionOpen());
        return () => {
            dispatch(wsAuthConnectionClosed())
        }
    }, [dispatch]);

    const [form, setForm] = useState({
        name: name,
        email: email,
        password: '',
    });
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(form.email, form.name, form.password));
    };

    function handleSingOut() {
        dispatch(singOut());
    };

    const onResetForm = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForm({
            email: email,
            name: name,
            password: '',
        })
    }

    return (
        <div className={`${ProfileStyles.profile} pt-30`}>
            {!matchOrderDetails && <nav className={`${ProfileStyles.container} pr-15`}>
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
            }
            <Switch location={background || location}>
                <Route path="/profile/orders" exact>
                    <Orders />
                </Route>
                <Route path='/profile/orders/:id' exact>
                    <OrdersInfo />
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
                        <Button type="secondary" size="medium" onClick={() => onResetForm}>
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
