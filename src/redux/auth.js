import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  SOME_ACTION: "SOME_ACTION",
  LOGIN_ADMIN: "LOGIN_ADMIN",
  LOGIN_ADMIN_SUCCESS: "LOGIN_ADMIN_SUCCESS",
  LOGIN_ADMIN_FAIL: "LOGIN_ADMIN_FAIL",
  LOGOUT: "LOGOUT",
  CLEAR_STATUS: "CLEAR_STATUS",
};

export const login_admin = (email, password) => ({
  type: types.LOGIN_ADMIN,
  payload: {
    email,
    password,
  },
});


export const clear_status = () => ({
  type: types.CLEAR_STATUS,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const someAction = () => ({
  type: types.SOME_ACTION,
});

/* END OF ACTION Section */

/* SAGA Section */

function* yourGeneratorFunction(action) {
  try {
    // Your saga logic here
  } catch (error) {
    // Handle errors
  }
}

export function* mySaga() {
  yield takeEvery(types.SOME_ACTION, yourGeneratorFunction);
}

export function* saga() {
  yield all([
    fork(watchLoginAdmin),
  ]);
}

const loginAdminSagaAsync = async (email, password) => {
  try {
    const apiResult = await API.get("wellly", "/login_admin", {
      queryStringParameters: {
        email: email,
        password: password,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};


function* loginAdminSaga({ payload }) {
  const { email, password } = payload;

  try {
    const loginResult = yield call(loginAdminSagaAsync, email, password);

    if (loginResult.results.message === "success") {
      yield put({
        type: types.LOGIN_ADMIN_SUCCESS,
        payload: loginResult.results.user,
      });
    } else if (
      loginResult.results.message === "fail" ||
      loginResult.results.message === "no_user"
    ) {
      yield put({
        type: types.LOGIN_ADMIN_FAIL,
      });
    }
  } catch (error) {
    console.log("error form login", error);
  }
}
/* END OF SAGA Section */

/* REDUCER Section */
export function* watchLoginAdmin() {
  yield takeEvery(types.LOGIN_ADMIN, loginAdminSaga);
}
const INIT_STATE = {
  // Initial state properties
  statusLoginAdmin: "default",
  user: null,
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.LOGIN_ADMIN:
      return {
        ...state,
        statusLoginAdmin: "loading",
      };
    case types.LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        statusLoginAdmin: "success",
      };
    case types.LOGIN_ADMIN_FAIL:
      return {
        ...state,
        statusLoginAdmin: "fail",
      };
    case types.CLEAR_STATUS:
      return {
        ...state,
        statusLoginAdmin: "default",
      };
    case types.LOGOUT:
      return INIT_STATE;
    default:
      return { ...state };
  }
}
