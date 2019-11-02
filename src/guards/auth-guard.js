import { store } from '../redux/store';

export const isUserAuthenticated = () => {
    const state = store.getState();
    if (state && state.userData && state.userData.token) {
        return true;
    }
    return false;
}