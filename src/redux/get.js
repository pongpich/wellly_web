import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

export const types = {
  GET_EVENT_ACTIVITY: "GET_EVENT_ACTIVITY",
  GET_EVENT_ACTIVITY_SUCCESS: "GET_EVENT_ACTIVITY_SUCCESS",
  GET_EVENT_ACTIVITY_FAIL: "GET_EVENT_ACTIVITY_FAIL",
};

/* ACTION Section */
export const getEventActivity = () => ({
  type: types.GET_EVENT_ACTIVITY,
});

const getEventActivitySagaAsync = async () => {
  try {
    const apiResult = await API.post("wellly", "/getEventActivity", {
      queryStringParameters: {},
    });
    console.log("get_event_activity apiResult", apiResult);
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* getEventActivitySaga({}) {
  try {
    const apiResult = yield call(getEventActivitySagaAsync);
    console.log("apiResult", apiResult);
    yield put({
      type: types.GET_EVENT_ACTIVITY_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from event_activity :", error);
  }
}

export function* watchGetEventActivity() {
  yield takeEvery(types.GET_EVENT_ACTIVITY, getEventActivitySaga);
}

export function* saga() {
  yield all([fork(watchGetEventActivity)]);
}

/* REDUCER Section */

const INIT_STATE = {
  status_event: "default",
  event: null,
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.GET_EVENT_ACTIVITY:
      return {
        ...state,
        status_event: "loading",
      };
    case types.GET_EVENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        status_event: "success",
        event: action.payload,
      };
    case types.GET_EVENT_ACTIVITY_FAIL:
      return {
        ...state,
        event: "fail",
      };
    default:
      return { ...state };
  }
}
