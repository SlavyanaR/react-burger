import React from "react";
import Appstyles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
    const [cards, setCards] = React.useState([]);

    return (
        <div className={Appstyles.page}>
            <AppHeader />
            <div>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </div>
    )
}
export default App;
