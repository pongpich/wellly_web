import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
    UPDATE_WALK_STEP: "UPDATE_WALK_STEP",
    UPDATE_WALK_STEP_SUCCESS: "UPDATE_WALK_STEP_SUCCESS",
    UPDATE_WALK_STEP_FAIL: "UPDATE_WALK_STEP_FAIL",
    UPDATE_DISTANCE: "UPDATE_DISTANCE",
    UPDATE_DISTANCE_SUCCESS: "UPDATE_DISTANCE_SUCCESS",
    UPDATE_DISTANCE_FAIL: "UPDATE_DISTANCE_FAIL",
};

export const updateWalkStep = (user_id, event_id, walk_step) => ({
    type: types.UPDATE_WALK_STEP,
    payload: {
        user_id, event_id, walk_step
    },
});

export const updateDistance = (user_id, event_id, distance, distance_goal) => ({
    type: types.UPDATE_DISTANCE,
    payload: {
        user_id, event_id, distance, distance_goal
    },
});


/* END OF ACTION Section */

/* SAGA Section */


const updateWalkStepSagaAsync = async (user_id, event_id, walk_step) => {
    try {
        const apiResult = await API.put("wellly", "/update_walk_step", {
            body: {
                user_id, event_id, walk_step
            },
        });
        return apiResult;
    } catch (error) {
        return { error, messsage: error.message };
    }
};

const updateDistanceSagaAsync = async (user_id, event_id, distance, distance_goal) => {
    try {
        const apiResult = await API.put("wellly", "/update_distance", {
            body: {
                user_id, event_id, distance, distance_goal
            },
        });
        return apiResult;
    } catch (error) {
        return { error, messsage: error.message };
    }
};

function* updateWalkStepSaga({ payload }) {
    const { user_id, event_id, walk_step } = payload;

    try {
        const apiResult = yield call(updateWalkStepSagaAsync, user_id, event_id, walk_step);

        if (apiResult.results.message === "success") {
            yield put({
                type: types.UPDATE_WALK_STEP_SUCCESS
            });
        }
    } catch (error) {
        console.log("error form updateWalkStepSaga", error);
    }
}

function* updateDistanceSaga({ payload }) {
    const { user_id, event_id, distance, distance_goal } = payload;

    try {
        const apiResult = yield call(updateDistanceSagaAsync, user_id, event_id, distance, distance_goal);

        if (apiResult.results.message === "success") {
            yield put({
                type: types.UPDATE_DISTANCE_SUCCESS
            });
        }
    } catch (error) {
        console.log("error form updateDistanceSaga", error);
    }
}
/* END OF SAGA Section */

/* REDUCER Section */
export function* watchUpdateWalkStepSaga() {
    yield takeEvery(types.UPDATE_WALK_STEP, updateWalkStepSaga);
}

export function* watchUpdateDistanceSaga() {
    yield takeEvery(types.UPDATE_DISTANCE, updateDistanceSaga);
}

export function* saga() {
    yield all([fork(watchUpdateWalkStepSaga)]);
    yield all([fork(watchUpdateDistanceSaga)]);
}

const INIT_STATE = {
    statusUpdateWalkStep: "default",
    statusUpdateDistance: "default"
};

export function reducer(state = INIT_STATE, action) {
    switch (action.type) {
        case types.UPDATE_DISTANCE:
            return {
                ...state,
                statusUpdateDistance: "loading",
            };
        case types.UPDATE_DISTANCE_SUCCESS:
            return {
                ...state,
                statusUpdateDistance: "success",
            };
        case types.UPDATE_WALK_STEP:
            return {
                ...state,
                statusUpdateWalkStep: "loading",
            };
        case types.UPDATE_WALK_STEP_SUCCESS:
            return {
                ...state,
                statusUpdateWalkStep: "success",
            };
        default:
            return { ...state };
    }
}
