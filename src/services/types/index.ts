import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { rootReducer } from '../reducers';
import { store } from '../store';
import { TAuthActions } from '../actions/auth';
import { TBurgerIngredientsActions } from '../actions/ingredientsApi';
import { TBurgerConstructorActions } from '../actions/consrtuctorItems';
import { TOrderDetailsActions } from '../actions/order';
import { TOrderInfoDetailsModalActions } from '../actions/orderInfoDetail';
import { TWsActions } from '../actions/wsAction';
import { TWsAuthActions } from '../actions/wsAuthAction';

type TApplicationActions =
	| TBurgerIngredientsActions
	| TBurgerConstructorActions
	| TOrderDetailsActions
	| TOrderInfoDetailsModalActions
	| TAuthActions
	| TWsActions
	| TWsAuthActions;


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;