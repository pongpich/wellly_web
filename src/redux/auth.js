import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  SOME_ACTION: "SOME_ACTION",
};

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
  yield fork(mySaga);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  // Initial state properties
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.SOME_ACTION:
      // Reducer logic for the action
      return { ...state };

    default:
      return state;
  }
}
