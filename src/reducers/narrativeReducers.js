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

export const narrativeListReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    /* NARRATIVE LIST */
    case NARRATIVE_LIST_REQUEST:
      return { ...state, loading: true };

    case NARRATIVE_LIST_SUCCESS:
      return { loading: false, list: action.payload };

    case NARRATIVE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    /* NARRATIVE CREATE */
    case NARRATIVE_CREATE_REQUEST:
      return { ...state, loading: true };

    case NARRATIVE_CREATE_SUCCESS:
      return { loading: false, list: [...state.list, action.payload] };

    case NARRATIVE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    /* NARRATIVE DELETE */
    case NARRATIVE_DELETE_REQUEST:
      return { ...state, loading: true };

    case NARRATIVE_DELETE_SUCCESS: {
      const deletedId = action.payload;
      console.log(action.payload);
      const filteredList = [...state.list.filter((n) => n._id !== deletedId)];
      return { loading: false, list: filteredList };
    }
    case NARRATIVE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const narrativeDetailsReducer = (state = { narrative: { title: "", desciption: "", image: null } }, action) => {
  switch (action.type) {
    /* NARRATIVE DETAILS SET */
    case NARRATIVE_DETAILS_REQUEST:
    case NARRATIVE_UPDATE_REQUEST:
      return { ...state, loading: true };

    case NARRATIVE_DETAILS_SUCCESS:
    case NARRATIVE_UPDATE_SUCCESS:
      return { loading: false, narrative: action.payload };

    case NARRATIVE_DETAILS_FAIL:
    case NARRATIVE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
