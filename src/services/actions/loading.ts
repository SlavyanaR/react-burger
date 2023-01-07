import {
    SET_LOADING_MODE,
    RESET_LOADING_MODE
} from "../action-types"

export type TSetLoadingModeAction = {
    readonly type: typeof SET_LOADING_MODE
}
export type TResetLoadingModeAction = {
    readonly type: typeof RESET_LOADING_MODE
}

export type TLoadingActions = 
| TSetLoadingModeAction 
| TResetLoadingModeAction;