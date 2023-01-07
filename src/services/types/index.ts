import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { rootReducer } from '../reducers';
import { TWsActions } from '../actions/wsAction';
import { TWsAuthActions } from '../actions/wsAuthAction';
import { TBurgerIngredientsActions } from '../actions/ingredientsApi';
import { TBurgerConstructorActions } from '../actions/constructorItems';
import { TOrderDetailsActions } from '../actions/order';
import { TIngredientModalActions } from '../actions/chosenIngredient';
import { TOrderInfoDetailsModalActions } from '../actions/orderInfoDetail';
import { TAuthActions } from '../actions/auth';


type TApplicationActions =
	| TBurgerConstructorActions
	| TBurgerIngredientsActions
	| TIngredientModalActions
	| TOrderDetailsActions
	| TOrderInfoDetailsModalActions
	| TWsActions
	| TWsAuthActions
	| TAuthActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;