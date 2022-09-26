import React from "react";
import Appstyles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetail from "../IngredientDetails/IngredientDetails";


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

    const [openingOrder, setOpeningOrder] = React.useState(false);
    const [openingDetails, setOpeningDetails] = React.useState(false);
    const [element, setElement] = React.useState(null);

    function openOrderDetails() {
        setOpeningOrder(true)
    }
    function openIngridientsDetail(card) {
        setOpeningDetails(true);
        setElement(card);
    }
    function closePopup(e) {
        setOpeningOrder(false);
        setOpeningDetails(false);
    }

    return (
        <div className={Appstyles.page}>
            <AppHeader />
            <div className={Appstyles.main}>
                <BurgerIngredients cards={cards} />
                <BurgerConstructor cards={cards} />
                <div id="modals"></div>
                {openingOrder &&
                    <Modal title=' ' onClose={closePopup}>
                        <OrderDetails />
                    </Modal>
                }
                {openingDetails &&
                    <Modal title='Детали заказа' onClose={closePopup} element={element}>
                        <IngredientDetail element={element} />
                    </Modal>
                }
            </div>

        </div>
    )
}
export default App;
