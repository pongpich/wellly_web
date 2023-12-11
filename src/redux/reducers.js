import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import settings from "./settings/reducer";

//ของ Pynk
import { reducer as auth } from "./auth";
import { reducer as createEv } from "./createEv";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const reducers = combineReducers({
  //ของ Bebe Stay Fit
  auth,
  createEv,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
