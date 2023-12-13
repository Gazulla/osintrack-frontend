import {
  TELEGRAM_CONNECT_CODE_SENT_TO_PHONE,
  TELEGRAM_CONNECT_FAIL,
  TELEGRAM_CONNECT_REQUEST,
  TELEGRAM_CONNECT_SUCCESS,
  TELEGRAM_GROUP_CHECK_FAIL,
  TELEGRAM_GROUP_CHECK_REQUEST,
  TELEGRAM_GROUP_CHECK_SUCCESS,
  TELEGRAM_CONNECT_CODE_INPUT_REQUEST,
  TELEGRAM_DISCONNECT_REQUEST,
  TELEGRAM_DISCONNECT_FAIL,
  TELEGRAM_CONNECT_CODE_INPUT_FAIL,
  TELEGRAM_CONNECT_CANCEL,
  TELEGRAM_DISCONNECT_SUCCESS,
  TELEGRAM_SESSION_CHECK_REQUEST,
  TELEGRAM_SESSION_CHECK_FAIL,
  TELEGRAM_SESSION_CHECK_SUCCESS,
} from "../constants/telegramConstants";

export const telegramGroupCheckReducer = (state = { checkedGroup: null, groups: [] }, action) => {
  switch (action.type) {
    /* TELEGRAM GROUP CHECK */
    case TELEGRAM_GROUP_CHECK_REQUEST:
      return { ...state, loading: true };

    case TELEGRAM_GROUP_CHECK_SUCCESS:
      return { ...state, loading: false, checkedGroup: action.payload };

    case TELEGRAM_GROUP_CHECK_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const telegramConnectionReducer = (state = { connected: false, codeSent: false, phoneCodeHash: "" }, action) => {
  switch (action.type) {
    /* TELEGRAM CONNECTION */
    case TELEGRAM_CONNECT_REQUEST:
    case TELEGRAM_CONNECT_CODE_INPUT_REQUEST:
    case TELEGRAM_DISCONNECT_REQUEST:
    case TELEGRAM_SESSION_CHECK_REQUEST:
      return { ...state, loading: true };

    case TELEGRAM_CONNECT_CODE_SENT_TO_PHONE:
      return { ...state, connected: false, loading: false, codeSent: true, phoneCodeHash: action.payload };

    case TELEGRAM_CONNECT_SUCCESS:
      return { ...state, loading: false, connected: true, codeSent: false, phoneCodeHash: "" };

    case TELEGRAM_CONNECT_FAIL:
      return { ...state, connected: false, loading: false, codeSent: false, error: action.payload };

    case TELEGRAM_CONNECT_CODE_INPUT_FAIL:
      return { ...state, connected: false, loading: false, codeSent: true, error: action.payload };

    case TELEGRAM_DISCONNECT_FAIL:
      return { ...state, connected: true, loading: false, codeSent: false, error: action.payload };

    case TELEGRAM_CONNECT_CANCEL:
    case TELEGRAM_DISCONNECT_SUCCESS:
      return { connected: false, codeSent: false, phoneCodeHash: "" };

    case TELEGRAM_SESSION_CHECK_SUCCESS:
      return { ...state, connected: action.payload };

    case TELEGRAM_SESSION_CHECK_FAIL:
      return { ...state };

    default:
      return state;
  }
};
