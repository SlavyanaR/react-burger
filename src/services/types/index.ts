import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { rootReducer } from '../reducers';
import { TWsSocketMiddlewareActions } from './data'; 
import { TUser } from './data';
import { TUserResponce } from './data';

type TApplicationActions = 
| TUser
| TUserResponce
| TWsSocketMiddlewareActions;




export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;