import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { loginReducer } from "./reducers/authReducers";
import { narrativeListReducer, narrativeDetailsReducer } from "./reducers/narrativeReducers";
import { adminSettingsReducer } from "./reducers/adminReducers";
import { telegramConnectionReducer, telegramGroupCheckReducer } from "./reducers/telegramReducers";
import { profileReducer } from "./reducers/profileReducers";

const reducer = combineReducers({
  login: loginReducer,
  narrativeList: narrativeListReducer,
  narrativeDetails: narrativeDetailsReducer,
  admin: adminSettingsReducer,
  profile: profileReducer,
  telegramGroupCheck: telegramGroupCheckReducer,
  telegramConnection: telegramConnectionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return reducer(state, action);
};

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
  login: { user: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
