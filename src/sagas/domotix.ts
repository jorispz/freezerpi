import { io } from "../gpio";
import { put, call, select, take, fork } from "redux-saga/effects";
import { sendWarningMail } from "./mail";
import { DoorState } from "../reducer";
import { eventChannel, Channel } from "redux-saga";
import { actions } from "../reducer";
import { doorSaga } from "./door";
import request from "request";
import { logger } from "../logger";

export function* domotixSaga(url: string) {
  let wasOpen: boolean | undefined = undefined;
  let isOpen: boolean;

  while (true) {
    isOpen = yield select((state: DoorState) => state.openSince !== undefined);
    if (isOpen !== wasOpen) {
      logger.info(`Posting door state '${isOpen}' to Domotix`);
      request.post(
        url,
        {
          form: { open: `${isOpen}` }
        },
        (err, resp, body) => {
          if (err) {
            logger.error(err);
          } else {
            logger.info("Post to Domotix succeeded");
          }
        }
      );
    }
    wasOpen = isOpen;
    yield take();
  }
}
