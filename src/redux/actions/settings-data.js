import {
  SET_CURRENT_THEME,
  TOGGLE_AUTOMATIC_THEME_UPDATE
} from "./action-types";

export const setCurrentTheme = (theme = "LIGHT") => {
  return {
    type: SET_CURRENT_THEME,
    payload: { theme }
  };
};

export const toggleAutomaticThemeUpdate = isAutomaticUpdateEnabled => {
  return {
    type: TOGGLE_AUTOMATIC_THEME_UPDATE,
    payload: {
      isAutomaticUpdateEnabled
    }
  };
};
