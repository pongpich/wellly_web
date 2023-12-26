import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

export const types = {
  GET_ACTIVITY_USERS: "GET_ACTIVITY_USERS",
  GET_ACTIVITY_USERS_SUCCESS: "GET_ACTIVITY_USERS_SUCCESS",
};

/* ACTION Section */
export const getActivityUsers = (id) => ({
  type: types.GET_ACTIVITY_USERS,
  payload: {
    id,
  },
});

const getActivityUsersSagaAsync = async (id) => {
  try {
    const apiResult = await API.get("wellly", "/get_activity_users", {
      queryStringParameters: { id },
    });
    /* console.log("getActivityUsers apiResult", apiResult); */
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* getActivityUsersSaga({ payload }) {
  const { id } = payload;
  try {
    const apiResult = yield call(getActivityUsersSagaAsync, id);
    /*  console.log("apiResult", apiResult.results); */
    yield put({
      type: types.GET_ACTIVITY_USERS_SUCCESS,
      payload: apiResult.results.event_user,
    });
  } catch (error) {
    console.log("error from ActivityUsers :", error);
  }
}

export function* watchGetActivityUsers() {
  yield takeEvery(types.GET_ACTIVITY_USERS, getActivityUsersSaga);
}
export function* saga() {
  yield all([fork(watchGetActivityUsers)]);
}

/* REDUCER Section */

const INIT_STATE = {
  activity_users: null,
  status_activity_users: "default",
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.GET_ACTIVITY_USERS:
      return {
        ...state,
        status_activity_users: "loading",
      };
    case types.GET_ACTIVITY_USERS_SUCCESS:
      return {
        ...state,
        activity_users: action.payload,
        status_activity_users: "success",
      };
    default:
      return { ...state };
  }
}
