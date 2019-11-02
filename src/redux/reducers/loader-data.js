import { SHOW_LOADER, HIDE_LOADER } from "../actions";

export const loaderDataReducer = (state = { isVisible: false, loaderText: 'Processing' }, action) => {
    let newState = { ...state };
    switch(action.type) {
        case SHOW_LOADER: {
            newState = {
                isVisible: true,
                loaderText: action.payload.loaderText
            }
            break;
        }
        case HIDE_LOADER: {
            newState = {
                isVisible: false,
                loaderText: 'Loading'
            }
            break;
        }
        default: {
            
        }
    }
    return newState;
}

