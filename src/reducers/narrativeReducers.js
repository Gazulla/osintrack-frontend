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

export const narrativeListReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    /* NARRATIVE LIST */
    case NARRATIVE_LIST_REQUEST:
      return { ...state, loading: true };

    case NARRATIVE_LIST_SUCCESS:
      return { ...state, loading: false, list: action.payload };

    case NARRATIVE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    /* NARRATIVE CREATION */
    case NARRATIVE_CREATE_REQUEST:
      return { ...state, loading: true };

    case NARRATIVE_CREATE_SUCCESS:
      return { ...state, loading: false, list: [...state.list, action.payload] };

    case NARRATIVE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const narrativeDetailsReducer = (state = { narrative: { title: "", desciption: "", image: null } }, action) => {
  switch (action.type) {
    /* NARRATIVE DETAILS SET */
    case NARRATIVE_DETAILS_REQUEST:
      return { loading: true };

    case NARRATIVE_DETAILS_SUCCESS:
      return { loading: false, narrative: action.payload };

    case NARRATIVE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
