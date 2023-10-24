import {
  ADMIN_SETTINGS_GET_FAIL,
  ADMIN_SETTINGS_GET_REQUEST,
  ADMIN_SETTINGS_GET_SUCCESS,
  ADMIN_SETTINGS_UPDATE_FAIL,
  ADMIN_SETTINGS_UPDATE_REQUEST,
  ADMIN_SETTINGS_UPDATE_SUCCESS,
} from "../constants/adminConstants";

export const adminSettingsReducer = (state = { settings: { telegramApiId: "", telegramApiHash: "" } }, action) => {
  switch (action.type) {
    case ADMIN_SETTINGS_GET_REQUEST:
    case ADMIN_SETTINGS_UPDATE_REQUEST:
      return { ...state, loading: true };

    case ADMIN_SETTINGS_GET_SUCCESS:
    case ADMIN_SETTINGS_UPDATE_SUCCESS:
      return { loading: false, settings: action.payload };

    case ADMIN_SETTINGS_GET_FAIL:
    case ADMIN_SETTINGS_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
