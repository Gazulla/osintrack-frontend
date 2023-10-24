import axios from "axios";
import { toast } from "react-toastify";

import {
  ADMIN_SETTINGS_GET_FAIL,
  ADMIN_SETTINGS_GET_REQUEST,
  ADMIN_SETTINGS_GET_SUCCESS,
  ADMIN_SETTINGS_UPDATE_FAIL,
  ADMIN_SETTINGS_UPDATE_REQUEST,
  ADMIN_SETTINGS_UPDATE_SUCCESS,
} from "../constants/adminConstants";

import useRequestConf from "../hooks/useRequestConf";

export const adminSettingsGet = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_SETTINGS_GET_REQUEST });

    const { config, apiUrl } = useRequestConf({ getState });
    const { data } = await axios.get(apiUrl + `/admin/settings/`, config);

    dispatch({ type: ADMIN_SETTINGS_GET_SUCCESS, payload: data });
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: ADMIN_SETTINGS_GET_FAIL,
      payload: apiError ? apiError : error.message,
    });
  }
};

export const adminSettingsUpdate =
  ({ formData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_SETTINGS_UPDATE_REQUEST,
      });

      const { config, apiUrl } = useRequestConf({ getState });
      const { data } = await axios.put(apiUrl + `/admin/settings/update/`, formData, config);

      dispatch({
        type: ADMIN_SETTINGS_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success("Settings successfully updated");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: ADMIN_SETTINGS_UPDATE_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Could not update settings");
    }
  };
