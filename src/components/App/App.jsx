import React from "react";
import Appstyles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";


function App() {
    const [cards, setCards] = React.useState([]);

    return (
        <div className={Appstyles.page}>
            <AppHeader />
            <div className={Appstyles.main}>
                <BurgerIngredients cards={cards} />
                <BurgerConstructor cards={cards} />
                <div id="modals"></div>
            </div>
            
        </div>
    )
}
export default App;
