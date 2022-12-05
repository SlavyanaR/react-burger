import React from "react";
import AppHeaderStyles from "./AppHeader.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

const AppHeader = () => {
    const location = useLocation();

    return (
        <header className={`${AppHeaderStyles.header} p-4`}>
            <div className={`${AppHeaderStyles.button} pl-5 pr-5`}>
                <NavLink
                    to='/'
                    exact
                    className={`${AppHeaderStyles.link} text text_type_main-default `}
                    activeClassName={`${AppHeaderStyles.linkActive} text text_type_main-default`}
                >
                    <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </NavLink>
            </div>
            <div className={`${AppHeaderStyles.button} pl-5 pr-5 ml-2`}>
                <NavLink
                    to='/feed'
                    exact
                    className={`${AppHeaderStyles.link} text text_type_main-default`}
                    activeClassName={`${AppHeaderStyles.linkActive} text text_type_main-default`}
                >
                    <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </NavLink>
            </div>
            <div className={AppHeaderStyles.logo}>
                <Link to='/'>
                    <Logo />
                </Link>
            </div>
            <div className={`${AppHeaderStyles.button} pl-5 pr-5`}>
                <NavLink
                    to='/profile'
                    className={`${AppHeaderStyles.link} text text_type_main-default`}
                    activeClassName={`${AppHeaderStyles.linkActive} text text_type_main-default`}
                >
                    <ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? 'primary' : 'secondary'} />
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </NavLink>
            </div>
        </header>
    )
}

export default AppHeader