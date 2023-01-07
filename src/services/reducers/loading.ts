import { SET_LOADING_MODE, RESET_LOADING_MODE } from "../action-types/index";
import { TLoadingActions } from "../actions/loading";

export type TLoadingState = true | false;

const initialState: TLoadingState = false;

export const loadingReducer = (state = initialState, action: TLoadingActions) => {
    switch (action.type) {
        case SET_LOADING_MODE: {
            return true
        }
        case RESET_LOADING_MODE: {
            return false
        }
        default: return state
    }
}