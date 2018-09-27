import { call, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { actions } from "../reducer";
import { logger } from "../logger";

export function* timerSaga() {
  while (true) {
    yield call(delay, 20000);
    logger.info("Escalating alert status");
    yield put(actions.escalate());
  }
}
