import { FreezerIO } from "..";
import { buzzer } from "./buzzer";
import { doorSensor } from "./door-sensor";

export const io: FreezerIO = {
  buzzer,
  doorSensor
};
