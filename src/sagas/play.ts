import { put, call, select, take, fork } from "redux-saga/effects";
import { parse } from "rtttl-parse";
import { io } from "../gpio";

export function* play(rtttl: string) {
  try {
    const song = parse(rtttl);
    for (let i = 0; i < song.melody.length; ++i) {
      const note = song.melody[i];
      yield call([io.buzzer, "buzz"], 0.1, note.duration, note.frequency);
    }
  } finally {
    io.buzzer.buzz(0, 1, 0);
  }
}
