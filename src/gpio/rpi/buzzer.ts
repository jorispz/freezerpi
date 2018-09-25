import { Gpio } from "pigpio";
import { Buzzer } from "..";

const pwmBuzzer = new Gpio(18, {
  mode: Gpio.OUTPUT
});

const frequency = 880;

export const buzzer: Buzzer = {
  buzz(level: number, durationMS: number) {
    pwmBuzzer.hardwarePwmWrite(
      frequency,
      1000000 * Math.min(Math.max(level, 0), 1)
    );
    setTimeout(() => pwmBuzzer.hardwarePwmWrite(frequency, 0), durationMS);
  }
};
