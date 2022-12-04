import React, { useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetail from "../IngredientDetails/IngredientDetails";
import { closeIngridientsDetail } from '../../services/actions/chosenIngredient';
import Modal from "../Modal/Modal";

import { getApiItems } from "../../services/actions/index";
import { Login, Register, ForgotPassword, ResetPassword, Profile, NotFound404 } from '../../pages';
import { getCookie } from "../../utils/utils";
import { getUser, updateToken } from "../../services/actions/auth";
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';


import Appstyles from "./App.module.css";

function App() {
    const dispatch = useDispatch();
    const chosenItem = useSelector(store => store.chosenIngredient);

    const token = localStorage.getItem('refreshToken');
    const cookie = getCookie('token');
    const location = useLocation();

    const background = location.state?.background;
    const history = useHistory();

    useEffect(() => {
        dispatch(getApiItems())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (!cookie && token) {
            dispatch(updateToken());
        }
    }, [dispatch, token, cookie]);

    const handlecloseIngridientsDetail = useCallback(() => {
        dispatch(closeIngridientsDetail());
        history.replace('/');
    }, [dispatch]);

    return (
        <div className={Appstyles.page}>
            <AppHeader />
            <>
                <Switch location={background || location}>
                    <Route path='/' exact>
                        <DndProvider backend={HTML5Backend}>
                            <main className={Appstyles.main}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </main>
                        </DndProvider>
                    </Route>
                    <Route path='/login' exact>
                        <Login />
                    </Route>
                    <Route path='/register' exact>
                        <Register />
                    </Route>
                    <Route path='/forgot-password' exact>
                        <ForgotPassword />
                    </Route>
                    <Route path='/reset-password' exact>
                        <ResetPassword />
                    </Route>
                    <Route path='/ingredients/:id' exact={true}>
                        <IngredientDetail />
                    </Route>
                    <ProtectedRoute path='/profile'>
                        <Profile />
                    </ProtectedRoute>
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>
                {background && (
                    <Route path='/ingredients/:id' exact={true}>
                        <Modal title='Детали ингредиента' onClose={handlecloseIngridientsDetail} >
                            <IngredientDetail element={chosenItem} />
                        </Modal>
                    </Route>
                )
                }
            </>
        </div>
    );
}

export default App;
