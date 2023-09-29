import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants/authConstants";

export const loginReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };

    case LOGIN_SUCCESS:
      return { loading: false, user: action.payload };

    case LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case LOGOUT:
      return { user: null };

    default:
      return state;
  }
};
