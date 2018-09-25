import { Gpio } from "pigpio";
import { DoorSensor } from "..";
import { logger } from "../../logger";

const sensor = new Gpio(23, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_UP,
  edge: Gpio.EITHER_EDGE,
  alert: true
});

// This is the maximum value allowed by the glitch filter
sensor.glitchFilter(300);

export const doorSensor: DoorSensor = {
  onChange(callback: (isOpen: boolean) => void) {
    sensor.on("alert", (level, tick) => {
      logger.info(`Received alert from sensor, level: ${level}`);
      callback(level === 1);
    });
  }
};
