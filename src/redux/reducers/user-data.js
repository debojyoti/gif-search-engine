import { UPDATE_USER_DATA, CLEAR_USER_DATA } from "../actions";

export const userDataReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case UPDATE_USER_DATA: {
            newState = action.payload.userData
            break;
        }
        case CLEAR_USER_DATA: {
            newState = {};
            break;
        }
        default: {
            
        }
    }
    return newState;
}
