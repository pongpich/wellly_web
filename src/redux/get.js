import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

export const types = {
  GET_EVENT_ACTIVITY: "GET_EVENT_ACTIVITY",
  GET_EVENT_ACTIVITY_SUCCESS: "GET_EVENT_ACTIVITY_SUCCESS",
  GET_EVENT_ACTIVITY_FAIL: "GET_EVENT_ACTIVITY_FAIL",
  GET_EVENT_USER: "GET_EVENT_USER",
  GET_EVENT_USER_SUCCESS: "GET_EVENT_USER_SUCCESS",
  GET_EVENT_USER_FAIL: "GET_EVENT_USER_FAIL",
};

/* ACTION Section */
export const getEventActivity = () => ({
  type: types.GET_EVENT_ACTIVITY,
});
export const getEventUser = (user_id) => ({
  type: types.GET_EVENT_USER,
  payload: {
    user_id,
  },
});

const getEventUserSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("wellly", "/get_event_user", {
      queryStringParameters: { user_id },
    });
    /*  console.log("get_event_User apiResult", apiResult); */
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const getEventActivitySagaAsync = async () => {
  try {
    const apiResult = await API.get("wellly", "/getEventActivity", {
      queryStringParameters: {},
    });
    /* console.log("get_event_activity apiResult", apiResult); */
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* getEventActivitySaga({}) {
  try {
    const apiResult = yield call(getEventActivitySagaAsync);
    /*  console.log("apiResult", apiResult); */
    yield put({
      type: types.GET_EVENT_ACTIVITY_SUCCESS,
      payload: apiResult.results.eventActivity,
    });
  } catch (error) {
    console.log("error from event_activity :", error);
  }
}
function* getEventUserSaga({ payload }) {
  const { user_id } = payload;
  try {
    const apiResult = yield call(getEventUserSagaAsync, user_id);
    /* console.log("apiResult", apiResult); */
    yield put({
      type: types.GET_EVENT_USER_SUCCESS,
      payload: apiResult.results.event_user,
    });
  } catch (error) {
    console.log("error from event_activity :", error);
  }
}

export function* watchGetEventActivity() {
  yield takeEvery(types.GET_EVENT_ACTIVITY, getEventActivitySaga);
}
export function* watchGetEventUser() {
  yield takeEvery(types.GET_EVENT_USER, getEventUserSaga);
}

export function* saga() {
  yield all([fork(watchGetEventActivity)]);
  yield all([fork(watchGetEventUser)]);
}

/* REDUCER Section */

const INIT_STATE = {
  status_event: "default",
  event: null,
  status_event_user: "default",
  event_user: null,
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
    case types.GET_EVENT_USER:
      return {
        ...state,
        status_event_user: "loading",
      };
    case types.GET_EVENT_USER_SUCCESS:
      return {
        ...state,
        status_event_user: "success",
        event_user: action.payload,
      };
    case types.GET_EVENT_USER_FAIL:
      return {
        ...state,
        event: "fail",
      };
    default:
      return { ...state };
  }
}
