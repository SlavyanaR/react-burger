import React, { useEffect, useCallback, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from '../../services/hooks';
import { Switch, Route, useLocation, useHistory, useRouteMatch } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetail from "../IngredientDetails/IngredientDetails";
import { closeIngridientsDetail } from '../../services/actions/chosenIngredient';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";


import { getApiItems } from "../../services/actions/ingredientsApi";
import { Login, Register, ForgotPassword, ResetPassword, Profile, NotFound404, Feed } from '../../pages';
import { getCookie } from "../../utils/utils";
import { getUser, updateToken } from "../../services/actions/auth";
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { closeOrderInfo } from "../../services/actions/orderInfoDetail";
import { OrdersInfo } from "../OrderInfo/OrderInfo";
import Appstyles from "./App.module.css";
import { closePopup } from "../../services/actions/order";
import {RESET_INGREDIENTS_IN_CONSTRUCTOR } from '../../services/action-types/index';
import { TLocation } from "../../services/types/data";

declare module 'react' {
    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
  }

const App: FC = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('refreshToken');
    const cookie = getCookie('token');
    const location = useLocation<TLocation>();
    const background = location.state?.background;
    const orderNum = useSelector((store) => store.order.number);
    const history = useHistory();
    const idOrderInfo = useRouteMatch<{[id: string] : string} | null>([
        '/profile/orders/:id',
        '/feed/:id',
    ])?.params?.id;

    useEffect(() => {
        dispatch(getApiItems())
    }, [dispatch])

    useEffect(() => {
        if (!cookie && token) {
            dispatch(updateToken());
        }
        if (cookie && token) {
            dispatch(getUser());
        }
    }, [dispatch, token, cookie]);

    const handlecloseIngridientsDetail = useCallback(() => {
        dispatch(closeIngridientsDetail());
        history.replace('/');
    }, [dispatch]);

    const handleCloseOrderInfoDetails = useCallback(() => {
        dispatch(closeOrderInfo());
        history.goBack();
    }, [dispatch]);

    const handleCloseOrderDetail = useCallback(() => {
        dispatch(closePopup());
        dispatch({
            type: RESET_INGREDIENTS_IN_CONSTRUCTOR
        })
    }, [dispatch]);



    return (
        <div className={Appstyles.page}>
            <AppHeader />
            <Switch location={background || location}>
                <Route path='/' exact>
                    <main className={Appstyles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider>
                    </main>
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
                <Route path='/ingredients/:id' exact>
                    <IngredientDetail />
                </Route>
                <Route path='/feed' exact>
                    <Feed />
                </Route>
                <Route path='/feed/:id' exact>
                    <OrdersInfo />
                </Route>
                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders/:id'>
                    <OrdersInfo />
                </ProtectedRoute>
                <Route>
                    <NotFound404 />
                </Route>
            </Switch>
            {background && (
                <Route path='/ingredients/:id' exact>
                    <Modal title='Детали ингредиента' onClose={handlecloseIngridientsDetail} >
                        <IngredientDetail />
                    </Modal>
                </Route>
            )
            }
            {background && idOrderInfo && (
                <ProtectedRoute path='/profile/orders/:id' exact>
                    <Modal title='' onClose={handleCloseOrderInfoDetails}>
                        <OrdersInfo />
                    </Modal>
                </ProtectedRoute>
            )
            }
            {background && idOrderInfo && (
                <Route path='/feed/:id' exact>
                    <Modal title='' onClose={handleCloseOrderInfoDetails}>
                        <OrdersInfo />
                    </Modal>
                </Route>
            )
            }
            {!!orderNum &&
                (<Modal title=' ' onClose={handleCloseOrderDetail} >
                    <OrderDetails />
                </Modal>)
            }
        </div>
    );
}

export default App;
