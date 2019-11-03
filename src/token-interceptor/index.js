import { store } from "../redux/store";
import { GIPHY_API_KEY } from "../config";

/**
 *
 * Checks for auth token in auth state & storage
 *
 */
export const getToken = () => {
  return GIPHY_API_KEY;
};
