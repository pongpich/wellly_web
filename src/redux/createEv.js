import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

export const types = {
  CREATE_EVENT_ACTIVITY: "CREATE_EVENT_ACTIVITY",
  CREATE_EVENT_ACTIVITY_SUCCESS: "CREATE_EVENT_ACTIVITY_SUCCESS",
  CREATE_EVENT_ACTIVITY_FAIL: "CREATE_EVENT_ACTIVITY_FAIL",
  CLEAR_STATUS: "CLEAR_STATUS",
  REGISTER_EVENT_ACTIVITY: "REGISTER_EVENT_ACTIVITY",
  REGISTER_EVENT_ACTIVITY_SUCCESS: "REGISTER_EVENT_ACTIVITY_SUCCESS",
  REGISTER_EVENT_ACTIVITY_FAIL: "REGISTER_EVENT_ACTIVITY_FAIL",
};

/* ACTION Section */
export const createEventActivity = (
  eventName,
  eventDetail,
  startDate,
  endDate,
  startDateShow,
  endDateShow,
  criteria_distance,
  distance,
  criteria_walk_step,
  walk_step,
  rewards,
  creator
) => ({
  type: types.CREATE_EVENT_ACTIVITY,
  payload: {
    eventName,
    eventDetail,
    startDate,
    endDate,
    startDateShow,
    endDateShow,
    criteria_distance,
    distance,
    criteria_walk_step,
    walk_step,
    rewards,
    creator,
  },
});
export const registerEventActivity = (id, user_id, walk_step, distance) => ({
  type: types.REGISTER_EVENT_ACTIVITY,
  payload: {
    id,
    user_id,
    walk_step,
    distance,
  },
});

export const clear_status = () => ({
  type: types.CLEAR_STATUS,
});

/* END OF ACTION Section */

/* SAGA Section */

const createEventActivitySagaAsync = async (
  eventName,
  eventDetail,
  startDate,
  endDate,
  startDateShow,
  endDateShow,
  criteria_distance,
  distance,
  criteria_walk_step,
  walk_step,
  rewards,
  creator
) => {
  try {
    const apiResult = await API.post("wellly", "/create_event_activity", {
      body: {
        eventName,
        eventDetail,
        startDate,
        endDate,
        startDateShow,
        endDateShow,
        criteria_distance,
        distance,
        criteria_walk_step,
        walk_step,
        rewards,
        creator,
      },
    });
    console.log("create_event_activity apiResult", apiResult);
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const registerEventActivitySagaAsync = async (
  id,
  user_id,
  walk_step,
  distance
) => {
  try {
    const apiResult = await API.post("wellly", "/register_event_activity", {
      body: {
        id,
        user_id,
        walk_step,
        distance,
      },
    });
    console.log("create_event_activity apiResult", apiResult);
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* createEventActivitySaga({ payload }) {
  const {
    eventName,
    eventDetail,
    startDate,
    endDate,
    startDateShow,
    endDateShow,
    criteria_distance,
    distance,
    criteria_walk_step,
    walk_step,
    rewards,
    creator,
  } = payload;

  try {
    const apiResult = yield call(
      createEventActivitySagaAsync,
      eventName,
      eventDetail,
      startDate,
      endDate,
      startDateShow,
      endDateShow,
      criteria_distance,
      distance,
      criteria_walk_step,
      walk_step,
      rewards,
      creator
    );

    if (apiResult.results.message === "success") {
      yield put({
        type: types.CREATE_EVENT_ACTIVITY_SUCCESS,
        payload: apiResult.results,
      });
    }
  } catch (error) {
    console.log("error from event_activity :", error);
  }
}
function* registerEventActivitySaga({ payload }) {
  const { id, user_id, walk_step, distance } = payload;

  try {
    const apiResult = yield call(
      registerEventActivitySagaAsync,
      id,
      user_id,
      walk_step,
      distance
    );

    if (apiResult.results.message === "success") {
      yield put({
        type: types.REGISTER_EVENT_ACTIVITY_SUCCESS,
        payload: apiResult.results,
      });
    }
  } catch (error) {
    console.log("error from event_activity :", error);
  }
}

export function* watchCreateEventActivity() {
  yield takeEvery(types.CREATE_EVENT_ACTIVITY, createEventActivitySaga);
}
export function* watchRegisterEventActivity() {
  yield takeEvery(types.REGISTER_EVENT_ACTIVITY, registerEventActivitySaga);
}

export function* saga() {
  yield all([fork(watchCreateEventActivity)]);
  yield all([fork(watchRegisterEventActivity)]);
}

/* REDUCER Section */

const INIT_STATE = {
  status_event_activity: "default",
  status_event_user: "default",
  event_activity: null,
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.CREATE_EVENT_ACTIVITY:
      return {
        ...state,
        status_event_activity: "loading",
      };
    case types.CREATE_EVENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        status_event_activity: "success",
        event_activity: action.payload,
      };
    case types.CREATE_EVENT_ACTIVITY_FAIL:
      return {
        ...state,
        status_event_activity: "fail",
      };
    case types.REGISTER_EVENT_ACTIVITY:
      return {
        ...state,
        status_event_user: "loading",
      };
    case types.REGISTER_EVENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        status_event_user: "success",
      };
    case types.REGISTER_EVENT_ACTIVITY_FAIL:
      return {
        ...state,
        status_event_user: "fail",
      };
    case types.CLEAR_STATUS:
      return {
        ...state,
        status_event_activity: "default",
        status_event_user: "default",
      };
    default:
      return { ...state };
  }
}
