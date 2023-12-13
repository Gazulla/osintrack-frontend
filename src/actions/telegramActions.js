import axios from "axios";
import {
  TELEGRAM_CONNECT_CODE_INPUT_FAIL,
  TELEGRAM_CONNECT_CODE_INPUT_REQUEST,
  TELEGRAM_CONNECT_CODE_SENT_TO_PHONE,
  TELEGRAM_CONNECT_FAIL,
  TELEGRAM_CONNECT_REQUEST,
  TELEGRAM_CONNECT_SUCCESS,
  TELEGRAM_DISCONNECT_FAIL,
  TELEGRAM_DISCONNECT_REQUEST,
  TELEGRAM_DISCONNECT_SUCCESS,
  TELEGRAM_GROUP_CHECK_FAIL,
  TELEGRAM_GROUP_CHECK_REQUEST,
  TELEGRAM_GROUP_CHECK_SUCCESS,
  TELEGRAM_SESSION_CHECK_FAIL,
  TELEGRAM_SESSION_CHECK_REQUEST,
  TELEGRAM_SESSION_CHECK_SUCCESS,
} from "../constants/telegramConstants";
import useRequestConf from "../hooks/useRequestConf";
import { toast } from "react-toastify";

export const telegramGroupCheck = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TELEGRAM_GROUP_CHECK_REQUEST,
    });
    const { config, apiUrl } = useRequestConf({ getState });
    const { data } = await axios.post(apiUrl + "/telegram/groups/check/", formData, config);
    dispatch({
      type: TELEGRAM_GROUP_CHECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: TELEGRAM_GROUP_CHECK_FAIL,
      payload: apiError ? apiError : error.message,
    });
  }
};

export const telegramConnect =
  ({ formData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TELEGRAM_CONNECT_REQUEST,
      });
      const { config, apiUrl } = useRequestConf({ getState });
      const { data } = await axios.post(apiUrl + "/telegram/connect/", formData, config);
      dispatch({
        type: TELEGRAM_CONNECT_CODE_SENT_TO_PHONE,
        payload: data,
      });
      toast.info("Verification code sent to your phone");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: TELEGRAM_CONNECT_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Unable to connect to Telegram. Check Telegram API credentials and phone number");
    }
  };

export const telegramInputPhoneCode =
  ({ fullData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TELEGRAM_CONNECT_CODE_INPUT_REQUEST,
      });
      console.log(fullData);
      const { config, apiUrl } = useRequestConf({ getState });
      const { data } = await axios.post(apiUrl + "/telegram/inputphonecode/", fullData, config);
      dispatch({
        type: TELEGRAM_CONNECT_SUCCESS,
        payload: data,
      });
      toast.success("Successfully connected to Telegram");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: TELEGRAM_CONNECT_CODE_INPUT_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Wrong verification code");
    }
  };

export const telegramDisconnect = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TELEGRAM_DISCONNECT_REQUEST,
    });
    const { config, apiUrl } = useRequestConf({ getState });
    const { data } = await axios.get(apiUrl + "/telegram/disconnect/", config);
    dispatch({
      type: TELEGRAM_DISCONNECT_SUCCESS,
      payload: data,
    });
    toast.success("Successfully disconnected from Telegram");
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: TELEGRAM_DISCONNECT_FAIL,
      payload: apiError ? apiError : error.message,
    });
    toast.error("Unable to disconnect from Telegram");
  }
};

export const telegramSessionCheck = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TELEGRAM_SESSION_CHECK_REQUEST,
    });
    const { config, apiUrl } = useRequestConf({ getState });
    const { data } = await axios.get(apiUrl + "/telegram/checksession/", config);
    dispatch({
      type: TELEGRAM_SESSION_CHECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: TELEGRAM_SESSION_CHECK_FAIL,
      payload: apiError ? apiError : error.message,
    });
  }
};
