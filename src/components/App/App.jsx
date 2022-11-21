import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Appstyles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useDispatch } from 'react-redux';
import { getApiItems } from "../../services/actions/index";
import { Switch, Route, useLocation } from 'react-router-dom';
import { Profile } from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';


function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getApiItems())
    }, [dispatch])

    return (
        <div className={Appstyles.page}>
            <AppHeader />
            <>
                <Switch >
                    <Route path='/' exact>
                        <DndProvider backend={HTML5Backend}>
                            <main className={Appstyles.main}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </main>
                        </DndProvider>
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                </Switch>
            </>
        </div>
    );
}

export default App;
