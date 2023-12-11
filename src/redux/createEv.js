import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

export const types = {
  CREATE_EVENT_ACTIVITY: "CREATE_EVENT_ACTIVITY",
  CREATE_EVENT_ACTIVITY_SUCCESS: "CREATE_EVENT_ACTIVITY_SUCCESS",
  CREATE_EVENT_ACTIVITY_FAIL: "CREATE_EVENT_ACTIVITY_FAIL",
};

/* ACTION Section */
export const createEventActivity = (
  event_name,
  event_detail,
  startDate,
  endDate,
  startDateActivity,
  endDateActivity,
  activityType,
  qty,
  limitedNumber,
  criteria_distance,
  distance,
  criteria_walk_step,
  walk_step,
  rewards,
  creator
) => ({
  type: types.CREATE_EVENT_ACTIVITY,
  payload: event_name,
  event_detail,
  startDate,
  endDate,
  startDateActivity,
  endDateActivity,
  activityType,
  qty,
  limitedNumber,
  criteria_distance,
  distance,
  criteria_walk_step,
  walk_step,
  rewards,
  creator,
});

/* END OF ACTION Section */

/* SAGA Section */

const createEventActivitySagaAsync = async (
  event_name,
  event_detail,
  startDate,
  endDate,
  startDateActivity,
  endDateActivity,
  activityType,
  qty,
  limitedNumber,
  criteria_distance,
  distance,
  criteria_walk_step,
  walk_step,
  rewards,
  creator
) => {
  try {
    const apiResult = await API.post("planforfit", "/create_event_activity", {
      body: {
        event_name,
        event_detail,
        startDate,
        endDate,
        startDateActivity,
        endDateActivity,
        activityType,
        qty,
        limitedNumber,
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

function* createEventActivitySaga({ payload }) {
  const {
    event_name,
    event_detail,
    startDate,
    endDate,
    startDateActivity,
    endDateActivity,
    activityType,
    qty,
    limitedNumber,
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
      event_name,
      event_detail,
      startDate,
      endDate,
      startDateActivity,
      endDateActivity,
      activityType,
      qty,
      limitedNumber,
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

export function* watchCreateEventActivity() {
  yield takeEvery(types.CREATE_EVENT_ACTIVITY, createEventActivitySaga);
}

export function* saga() {
  yield all([fork(watchCreateEventActivity)]);
}

/* REDUCER Section */

const INIT_STATE = {
  status_event_activity: "default",
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
    default:
      return { ...state };
  }
}
