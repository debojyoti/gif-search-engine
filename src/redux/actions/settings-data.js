import {
  UPDATE_SETTINGS
} from "./action-types";

export const updateSettings = settings => {
  return {
    type: UPDATE_SETTINGS,
    payload: {
      settings
    }
  };
};
