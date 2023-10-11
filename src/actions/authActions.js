import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants/authConstants";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      apiUrl + "/auth/login/",
      {
        username: username,
        password: password,
      },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const apiError = error?.response?.data?.detail;
    dispatch({
      type: LOGIN_FAIL,
      payload: apiError ? apiError : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: LOGOUT });
};
