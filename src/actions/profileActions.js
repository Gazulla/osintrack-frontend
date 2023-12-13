import axios from "axios";
import { toast } from "react-toastify";

import {
  PROFILE_GET_FAIL,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_REQUEST,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_FAIL,
} from "../constants/profileConstants";

import useRequestConf from "../hooks/useRequestConf";

export const profileGet = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_GET_REQUEST });

    const { config, apiUrl } = useRequestConf({ getState });
    const { data } = await axios.get(apiUrl + `/profile/`, config);

    dispatch({ type: PROFILE_GET_SUCCESS, payload: data });
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: PROFILE_GET_FAIL,
      payload: apiError ? apiError : error.message,
    });
  }
};

export const profileUpdate =
  ({ formData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
      });

      const { config, apiUrl } = useRequestConf({ getState });
      const { data } = await axios.put(apiUrl + `/profile/update/`, formData, config);

      dispatch({
        type: PROFILE_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success("Profile successfully updated");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: PROFILE_UPDATE_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Unable to update profile");
    }
  };

export const passwordUpdate =
  ({ formData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PASSWORD_UPDATE_REQUEST,
      });

      const { config, apiUrl } = useRequestConf({ getState });
      const { data } = await axios.put(apiUrl + `/profile/password/update/`, formData, config);

      dispatch({
        type: PASSWORD_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success("Password successfully updated");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: PASSWORD_UPDATE_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Unable to update password");
    }
  };

export const profileImageUpdate =
  ({ image }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_IMAGE_UPDATE_REQUEST,
      });

      const { config, apiUrl } = useRequestConf({ getState, uploadFiles: true });
      const { data } = await axios.put(apiUrl + `/profile/image/update/`, { image }, config);

      dispatch({
        type: PROFILE_IMAGE_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success("Profile picture successfully updated");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: PROFILE_IMAGE_UPDATE_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Unable to update profile picture");
    }
  };
