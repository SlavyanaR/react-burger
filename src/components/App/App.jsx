import React from "react";
import Appstyles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
    const [cards, setCards] = React.useState([]);

    const config = {
        baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    async function getCards() {
        return await fetch(`${config.baseUrl}`, {
            headers: config.headers
        })
    }

    React.useEffect(() => {
        getCards()
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(cards => {
                setCards(cards.data);
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }, []);


    return (
        <div className={Appstyles.page}>
            <AppHeader />
            <main className={Appstyles.main}>
                <BurgerIngredients cards={cards} />
                <BurgerConstructor cards={cards} />
            </main>

        </div>
    )
}
export default App;
