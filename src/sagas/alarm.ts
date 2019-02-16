import { call, fork } from "redux-saga/effects";
import { delay, Task } from "redux-saga";
import { play } from "./play";
import { sendWarningMail } from "./mail";
import http from "http";

export function* alarmSaga() {
  try {
    yield call(play, "beep:d=4,o=6,b=635:a");
    yield call(delay, 20000);
    yield call(play, "remind:d=4,o=6,b=635:a,g,a");
    yield call(delay, 5000);
    yield call(play, "remind:d=4,o=6,b=635:a,g,a");
    yield call(delay, 5000);
    yield call(play, "remind:d=4,o=6,b=635:a,g,a");
    yield call(delay, 5000);
    yield call(play, "remind:d=4,o=6,b=635:a,g,a");
    yield call(delay, 5000);
    yield call(play, "alert:d=4,o=6,b=635:a,b,c7,b,a,b,c7,b,a");
    for (let i = 0; i < 50; ++i) {
      yield call(delay, 2000);
      yield call([http, "get"], "localhost:5005/sayall/Waarschuwing. De deur van de vriezer staat open/nl-nl/60");
      yield call(play, "alert:d=4,o=6,b=635:a,b,c7,b,a,b,c7,b,a");
    }
    yield call(sendWarningMail);
  } finally {
    yield call(play, "close:d=4,o=6,b=635:a,g,a");
  }
}
