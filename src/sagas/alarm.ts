import { call, fork } from "redux-saga/effects";
import { delay, Task } from "redux-saga";
import { play } from "./play";
import { sendWarningMail } from "./mail";

export function* alarmSaga() {
  try {
    yield call(play, "beep:d=4,o=6,b=640:a");
    yield call(delay, 20000);
    yield call(play, "remind:d=4,o=6,b=640:a,g,a");
    yield call(delay, 5000);
    yield call(play, "remind:d=4,o=6,b=640:a,g,a");
    yield call(delay, 5000);
    yield call(play, "remind:d=4,o=6,b=640:a,g,a");
    yield call(delay, 5000);
    yield call(play, "remind:d=4,o=6,b=640:a,g,a");
    yield call(delay, 5000);
    yield call(play, "alert:d=4,o=6,b=640:a,b,c7,b,a,b,c7,b,a");
    for (let i = 0; i < 50; ++i) {
      yield call(delay, 1000);
      yield call(play, "alert:d=4,o=6,b=640:a,b,c7,b,a,b,c7,b,a");
    }
    yield call(sendWarningMail);
  } finally {
    yield call(play, "close:d=4,o=6,b=640:a,g,a");
  }
}
