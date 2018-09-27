import { select, call, take, fork } from "redux-saga/effects";
import { DoorState } from "../reducer";
import { doorSaga } from "./door";
import { logger } from "../logger";
import { buzzerSaga } from "./buzzer";
import { Task } from "redux-saga";
import { timerSaga } from "./timer";

export function* rootSaga() {
  yield fork(doorSaga);
  yield fork(buzzerSaga);
  let timerTask: Task | undefined = undefined;
  while (true) {
    const isOpen = yield select((state: DoorState) => !!state.openSince);
    if (isOpen && timerTask === undefined) {
      logger.info("Door has opened, starting timer saga");
      timerTask = yield fork(timerSaga);
    }
    if (!isOpen && timerTask !== undefined) {
      logger.info("Door is closed, canceling timer saga");
      timerTask.cancel();
      timerTask = undefined;
    }
    yield take();
  }
}
