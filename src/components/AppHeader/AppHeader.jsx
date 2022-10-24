import React from "react";
import AppHeaderStyles from "./AppHeader.module.css";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    return (
        <header className={`${AppHeaderStyles.header} p-4`}>            
            <div className={`${AppHeaderStyles.button} pl-5 pr-5`}>
                <BurgerIcon />
                <p className="text text_type_main-default ml-2">Конструктор</p>
            </div>
            <div className={`${AppHeaderStyles.button} pl-5 pr-5 ml-2`}>
                <ListIcon />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
            </div>
            <div className={AppHeaderStyles.logo}>
                <Logo />
            </div>
            <div className={`${AppHeaderStyles.button} pl-5 pr-5`}>
                <ProfileIcon />
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </div>
        </header>
    )
}

