import { UPDATE_SETTINGS } from "../actions";

const defaultSettings = {
  isDarkModeEnabled: false,
  isAutomaticThemeUpdateEnabled: false,
  isSearchHistoryEnabled: true,
  isAutoPlayEnabled: true
};

export const settingsDataReducer = (
  state = defaultSettings,
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case UPDATE_SETTINGS: {
      newState = action.payload.settings;
      break;
    }
    default: {
    }
  }
  return newState;
};
