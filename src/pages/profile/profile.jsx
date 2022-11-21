import React, { useState } from 'react';
import { NavLink, } from 'react-router-dom';
import ProfileStyles from './profile.module.css';

export const Profile = () => {

    return (
        <div className={`${ProfileStyles.container} pt-30`}>
            <nav className={`${ProfileStyles.nav} pr-15`}>
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
                            to='/profile'
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

                        >
                            Выход
                        </NavLink>
                    </li>
                </ul>
                <p className={`${ProfileStyles.text} text text_type_main-default text_color_inactive pt-20 pb-4`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
        </div >
    )
}