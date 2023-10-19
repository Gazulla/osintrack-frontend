import axios from "axios";
import { toast } from "react-toastify";
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
  NARRATIVE_UPDATE_REQUEST,
  NARRATIVE_UPDATE_SUCCESS,
  NARRATIVE_UPDATE_FAIL,
  NARRATIVE_DELETE_REQUEST,
  NARRATIVE_DELETE_SUCCESS,
  NARRATIVE_DELETE_FAIL,
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
    toast.success("Narrative successfully created");
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: NARRATIVE_CREATE_FAIL,
      payload: apiError ? apiError : error.message,
    });
    toast.error("Could not create the narrative");
  }
};

export const narrativeUpdate =
  ({ narrativeId, formData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: NARRATIVE_UPDATE_REQUEST,
      });

      const { config, apiUrl } = useRequestConf({ getState, uploadFiles: true });
      const { data } = await axios.put(apiUrl + `/narratives/update/${narrativeId}/`, formData, config);

      dispatch({
        type: NARRATIVE_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success("Narrative successfully updated");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: NARRATIVE_UPDATE_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Could not update the narrative");
    }
  };

export const narrativeDelete =
  ({ narrativeId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: NARRATIVE_DELETE_REQUEST,
      });
      const { config, apiUrl } = useRequestConf({ getState });
      const { data } = await axios.delete(apiUrl + `/narratives/delete/${narrativeId}/`, config);
      dispatch({
        type: NARRATIVE_DELETE_SUCCESS,
        payload: data,
      });
      toast.success("Narrative successfully deleted");
    } catch (error) {
      const apiError = error?.response?.data?.detail;
      dispatch({
        type: NARRATIVE_DELETE_FAIL,
        payload: apiError ? apiError : error.message,
      });
      toast.error("Could not delete the narrative");
    }
  };
