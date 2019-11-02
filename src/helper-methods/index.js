import { store } from "../redux/store";
import { clearUserData } from "../redux/actions/user-data";
import * as _deepClone from "clone-deep";
import { ToastsStore } from "react-toasts";


export const logout = navRef => {
    store.dispatch(clearUserData());
    // Clear other reducers data also
    if (navRef) {
        navRef.replace('/login');
    }
}

export const deepClone = data => {
    return _deepClone(data);
}

export const sleepTime = n => new Promise(r => setTimeout(() => r(), n));

export const scrollToTop = () => {window.scrollTo(0,0)};

export const showToast = (message, type = "error") => {
    ToastsStore[type](message, 4000);
  };
