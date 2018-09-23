export interface Buzzer {
  buzz(level: number, durationMS: number): void;
}

export interface DoorSensor {
  onChange(callback: (isOpen: boolean) => void): void;
}

export interface FreezerIO {
  buzzer: Buzzer;
  doorSensor: DoorSensor;
}

let _io: FreezerIO;
try {
  _io = require("./rpi").io;
} catch (e) {
  console.log("Error requiring actual implementation, falling back on mock");
  _io = require("./mock").io;
}

export const io = _io;
