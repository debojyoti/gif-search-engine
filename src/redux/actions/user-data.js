import { UPDATE_USER_DATA, CLEAR_USER_DATA } from "./action-types";


export const updateUserData = userData => {
    return {
        type: UPDATE_USER_DATA,
        payload: {
            userData
        }
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA
    }
}