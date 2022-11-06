import React, { useEffect } from "react";
import Appstyles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { getApiItems } from "../../services/actions/index";

function App() {
    const dispatch = useDispatch();
    const loading = useSelector(store => store.loading);

   
    useEffect(() => {
        dispatch(getApiItems())
    }, [dispatch])

    return (
        <main className={Appstyles.page}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <div className={Appstyles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </DndProvider>
            {loading &&
                (<Modal title='LOADING...' onClose={() => { }} />)
            }
        </main>
    );
}

export default App;