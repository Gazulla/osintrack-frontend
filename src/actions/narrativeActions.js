import axios from "axios";

import {
  NARRATIVE_LIST_REQUEST,
  NARRATIVE_LIST_SUCCESS,
  NARRATIVE_LIST_FAIL,
  NARRATIVE_CREATE_REQUEST,
  NARRATIVE_CREATE_SUCCESS,
  NARRATIVE_CREATE_FAIL,
  NARRATIVE_DETAILS_REQUEST,
  NARRATIVE_DETAILS_SUCCESS,
  NARRATIVE_DETAILS_FAIL,
} from "../constants/narrativeConstants";

import useRequestConf from "../hooks/useRequestConf";

export const narrativeList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NARRATIVE_LIST_REQUEST });

    const { config, apiUrl } = useRequestConf({ getState });
    const { data } = await axios.get(apiUrl + `/narratives/`, config);

    dispatch({ type: NARRATIVE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: NARRATIVE_LIST_FAIL,
      payload: apiError ? apiError : error.message,
    });
  }
};

export const narrativeDetails =
  ({ narrativeId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: NARRATIVE_DETAILS_REQUEST });

      const { config, apiUrl } = useRequestConf({ getState });
      const { data } = await axios.get(apiUrl + `/narratives/${narrativeId}`, config);

      dispatch({ type: NARRATIVE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: NARRATIVE_DETAILS_FAIL,
        payload: apiError ? apiError : error.message,
      });
    }
  };

export const narrativeCreate = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NARRATIVE_CREATE_REQUEST,
    });

    const { config, apiUrl } = useRequestConf({ getState, uploadFiles: true });
    const { data } = await axios.post(apiUrl + "/narratives/create/", formData, config);

    dispatch({
      type: NARRATIVE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: NARRATIVE_CREATE_FAIL,
      payload: apiError ? apiError : error.message,
    });
  }
};
