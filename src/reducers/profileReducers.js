import {
  PASSWORD_UPDATE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_IMAGE_UPDATE_FAIL,
  PROFILE_IMAGE_UPDATE_REQUEST,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from "../constants/profileConstants";

export const profileReducer = (state = { user: { image: "" }, error: null, passwordError: null, imageError: null }, action) => {
  switch (action.type) {
    case PROFILE_GET_REQUEST:
    case PROFILE_UPDATE_REQUEST:
    case PROFILE_IMAGE_UPDATE_REQUEST:
    case PASSWORD_UPDATE_REQUEST:
      return { ...state, loading: true };

    case PROFILE_GET_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, user: action.payload, error: null, passwordError: null };

    case PROFILE_IMAGE_UPDATE_SUCCESS:
      return { loading: false, user: action.payload, error: null, imageError: null };

    case PASSWORD_UPDATE_SUCCESS:
      return { ...state, loading: false, error: null, passwordError: null };

    case PROFILE_GET_FAIL:
    case PROFILE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PROFILE_IMAGE_UPDATE_FAIL:
      return { ...state, loading: false, imageError: action.payload };

    case PASSWORD_UPDATE_FAIL:
      return { ...state, loading: false, passwordError: action.payload };
    default:
      return state;
  }
};
