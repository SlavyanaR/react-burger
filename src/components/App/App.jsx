import React from "react";
import Appstyles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { DataContext, OrderContext } from "../../services/appContect";
import { config } from "../Api/Api";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetail from "../IngredientDetails/IngredientDetails";

function App() {

    const [cards, setCards] = React.useState([]);

    async function getCards() {
        return await fetch(`${config.baseUrl}/ingredients`, {
            headers: config.headers
        })
    }

    function checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async function postOrder(orderList) {
        const idList = { "ingredients": orderList.map(item => item._id) }
        return await fetch(`${config.baseUrl}/orders`, {
            headers: config.headers,
            method: 'POST',
            body: JSON.stringify(idList)
        })
    }

    React.useEffect(() => {
        getCards()
            .then(res => checkRes(res))
            .then(cards => {
                setCards(cards.data);
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }, []);

    const [orderList, setOrderList] = React.useState([]);
    const [orderNumber, setOrderNumber] = React.useState('');
    const [openingOrder, setOpeningOrder] = React.useState(false);
    const [openingDetails, setOpeningDetails] = React.useState(false);
    const [element, setElement] = React.useState(null);

    function openOrderDetails() {
        postOrder(orderList)
            .then(res => checkRes(res))
            .then(data => {
                setOrderNumber(data.order.number);
                setOpeningOrder(true);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
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
            <DataContext.Provider value={{ cards, setCards }} >
                <OrderContext.Provider value={{ orderList, setOrderList }} >
                    <div className={Appstyles.main}>
                        <BurgerIngredients onClick={openIngridientsDetail} />
                        <BurgerConstructor onClick={openOrderDetails} />
                    </div>
                    {openingOrder &&
                        <Modal title=' ' onClose={closePopup} number={orderNumber}>
                            <OrderDetails number={orderNumber} />
                        </Modal>
                    }
                    {openingDetails &&
                        <Modal title='Детали заказа' onClose={closePopup} element={element}>
                            <IngredientDetail element={element} />
                        </Modal>
                    }
                </OrderContext.Provider>
            </DataContext.Provider>
        </div>
    );
}

export default App;