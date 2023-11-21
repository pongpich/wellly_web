import { all } from "redux-saga/effects";

//ของ Bebe Stay Fit
import { saga as authSagas } from "./auth";

export default function* rootSaga(getState) {
  yield all([
    //ของ Bebe Stay Fit
    authSagas(),
  ]);
}
