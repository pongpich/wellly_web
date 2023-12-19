import { all } from "redux-saga/effects";

//ของ Bebe Stay Fit
import { saga as authSagas } from "./auth";
import { saga as createEvSagas } from "./createEv";
import { saga as getSagas } from "./get";
import { saga as updateSagas } from "./update";

export default function* rootSaga(getState) {
  yield all([
    //ของ Bebe Stay Fit
    authSagas(),
    createEvSagas(),
    getSagas(),
    updateSagas(),
  ]);
}
