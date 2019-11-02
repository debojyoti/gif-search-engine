import { SET_CURRENT_THEME, TOGGLE_AUTOMATIC_THEME_UPDATE } from "../actions";

export const settingsDataReducer = (
  state = {
    currentTheme: "LIGHT",
    isAutomaticUpdateEnabled: false
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_CURRENT_THEME: {
      newState.currentTheme = action.payload.theme;
      break;
    }
    case TOGGLE_AUTOMATIC_THEME_UPDATE: {
      newState.isAutomaticUpdateEnabled =
        action.payload.isAutomaticUpdateEnabled;
      break;
    }
    default: {
    }
  }
  return newState;
};
