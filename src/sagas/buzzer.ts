import { put, call, select, take, fork } from "redux-saga/effects";
import { DoorState, WarningLevel } from "../reducer";
import { Task, delay } from "redux-saga";
import { buzzer } from "../gpio/rpi/buzzer";

export function* buzzerSaga() {
  let previousLevel: WarningLevel | undefined = undefined;
  let currentLevel: WarningLevel;
  let currentTask: Task | undefined;

  while (true) {
    currentLevel = yield select((state: DoorState) => state.warningLevel);
    if (currentLevel !== previousLevel) {
      if (currentTask) {
        currentTask.cancel();
      }
    }
    switch (currentLevel) {
      case WarningLevel.LOW:
        currentTask = yield fork(buzz, 0.5, 2000);
        break;
      case WarningLevel.MEDIUM:
        currentTask = yield fork(buzz, 0.5, 1000);
        break;
      case WarningLevel.HIGH:
        currentTask = yield fork(buzz, 0.9, 250);
        break;
    }
    previousLevel = currentLevel;
    yield take();
  }
}

export function* buzz(level: number, delayMS: number) {
  try {
    while (true) {
      yield call([buzzer, "buzz"], level, 75);
      yield call(delay, delayMS);
    }
  } finally {
    buzzer.buzz(0, 10);
  }
}
