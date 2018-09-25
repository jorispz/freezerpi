import { io } from "../gpio";
import { put, take } from "redux-saga/effects";
import { eventChannel, Channel } from "redux-saga";
import { actions } from "../reducer";

function createSensorChannel(): Channel<{ isOpen: boolean }> {
  return eventChannel(emit => {
    io.doorSensor.onChange(isOpen => emit({ isOpen }));
    return () => {};
  });
}

export function* doorSaga() {
  const channel = createSensorChannel();
  while (true) {
    const { isOpen } = yield take(channel);
    if (isOpen) {
      yield put(actions.doorOpened());
    } else {
      yield put(actions.doorClosed());
    }
  }
}
