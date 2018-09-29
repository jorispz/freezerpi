import { select, call, take, fork } from "redux-saga/effects";
import { DoorState } from "../reducer";
import { doorSaga } from "./door";
import { logger } from "../logger";
import { Task } from "redux-saga";
import { timerSaga } from "./timer";
import { play } from "./play";

export function* rootSaga() {
  yield fork(play, "batman:d=8,o=5,b=180:b,b,a#,a#,a,a,a#,a#,b,b,a#,a#,a,a,a#,a#,4b,p,4b");
  yield fork(doorSaga);
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
