import { select, call, take, fork } from "redux-saga/effects";
import { DoorState } from "../reducer";
import { doorSaga } from "./door";
import { logger } from "../logger";
import { Task } from "redux-saga";
import { alarmSaga } from "./alarm";
import { play } from "./play";

export function* rootSaga() {
  yield fork(doorSaga);

  let alarmTask: Task | undefined = undefined;
  while (true) {
    const isOpen = yield select((state: DoorState) => !!state.openSince);
    if (isOpen && alarmTask === undefined) {
      logger.info("Door has opened, starting alarm saga");
      alarmTask = yield fork(alarmSaga);
    }
    if (!isOpen && alarmTask !== undefined) {
      logger.info("Door is closed, canceling alarm saga");
      alarmTask.cancel();
      alarmTask = undefined;
    }
    yield take();
  }
}
