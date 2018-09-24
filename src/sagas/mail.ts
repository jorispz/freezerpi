import nodemailer from "nodemailer";
import envalid, { str, email } from "envalid";
import { select, call } from "redux-saga/effects";
import { logger } from "../logger";
import { DoorState } from "../reducer";
import dateFunctions from "date-fns";

const env = envalid.cleanEnv(process.env, {
  FPI_USER: email(),
  FPI_CLIENT_ID: str(),
  FPI_CLIENT_SECRET: str(),
  FPI_REFRESH_TOKEN: str(),
  FPI_FROM: str(),
  FPI_TO: str()
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: env.FPI_USER,
    clientId: env.FPI_CLIENT_ID,
    clientSecret: env.FPI_CLIENT_SECRET,
    refreshToken: env.FPI_REFRESH_TOKEN
  }
});

export function* sendWarningMail() {
  try {
    const openSince: Date | undefined = yield select(
      (state: DoorState) => state.openSince
    );

    if (openSince === undefined) {
      throw new Error("Asked to sent mail but the door is closed");
    }

    const text = `The door has been open for ${dateFunctions.distanceInWords(
      openSince,
      new Date()
    )}`;

    const message = {
      from: env.FPI_FROM,
      to: env.FPI_TO,
      subject: "[FREEZERPI] The freezer door is open!",
      text
    };
    logger.debug(`Sending mail to ${message.to}`);
    yield call([transporter, transporter.sendMail], message);
    logger.debug("Mail sent succesfully");
  } catch (e) {
    logger.error(e, "Failed to sent mail");
  }
}
