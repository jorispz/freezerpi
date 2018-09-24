import { io } from "../gpio";
import { call } from "redux-saga/effects";
import { sendWarningMail } from "./mail";

export function* rootSaga() {
  yield call(sendWarningMail);

  io.doorSensor.onChange(isOpen => {
    console.log({ isOpen });
  });

  io.buzzer.buzz(0.5, 100);
  yield call(console.log, "Hi");
}
