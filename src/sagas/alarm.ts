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
    yield call(delay, 5000);
    for (let i = 0; i < 60; ++i) {
      const volume = Math.round(30 + i / 2);
      yield fork(playWarningInRoom, "Woonkamer", volume);
      yield fork(playWarningInRoom, "Douche", volume);
      yield fork(playWarningInRoom, "Slaapkamer", volume);
      yield call(delay, 8000);
      // yield call(play, "alert:d=4,o=6,b=635:a,b,c7,b,a,b,c7,b,a");
    }
    yield call(sendWarningMail);
  } finally {
    yield call(play, "close:d=4,o=6,b=635:a,g,a");
  }
}

export function* playWarningInRoom(room: String, volume: number) {
  yield call(
    [http, "get"],
    // `http://localhost:5005/${room}/say/Waarschuwing. De deur van de vriezer staat open/nl-nl/60`
    `http://localhost:5005/${room}/clip/vriezer.mp3/${volume}`
  );
}
