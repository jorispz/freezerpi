import { put, call, select, take, fork } from "redux-saga/effects";
import { parse } from "rtttl-parse";
import { io } from "../gpio";
import { logger } from "../logger";
import { delay } from "redux-saga";

const dutyCycle = 0.1;

export function* play(rtttl: string) {
  try {
    const song = parse(rtttl);
    for (let i = 0; i < song.melody.length; ++i) {
      const note = song.melody[i];
      logger.debug("Playing note", note);
      if (note.frequency !== 0) {
        yield call([io.buzzer, "buzz"], dutyCycle, note.frequency);
      } else {
        yield call([io.buzzer, "buzz"], 0, 440);
      }
      yield call(delay, note.duration);
    }
  } finally {
    io.buzzer.buzz(0, 440);
  }
}
