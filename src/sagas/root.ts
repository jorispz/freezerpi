import { select, take, fork } from "redux-saga/effects";
import { DoorState } from "../reducer";
import { doorSaga } from "./door";
import { domotixSaga } from "./domotix";
import { logger } from "../logger";
import envalid, { str } from "envalid";

const env = envalid.cleanEnv(process.env, {
  FPI_DOMOTIX_URL: str()
});

export function* rootSaga() {
  yield fork(domotixSaga, env.FPI_DOMOTIX_URL);
  yield fork(doorSaga);
  while (true) {
    yield select((state: DoorState) => state.openSince);
    const action = yield take();
    logger.info(`Action: ${action}`);
  }
}
