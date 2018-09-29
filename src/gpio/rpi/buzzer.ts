import { Gpio } from "pigpio";
import { Buzzer } from "..";

const pwmBuzzer = new Gpio(18, {
  mode: Gpio.OUTPUT
});

export const buzzer: Buzzer = {
  buzz(level: number, durationMS: number, frequency: number) {
    if (frequency === 0 || level === 0) {
      pwmBuzzer.hardwarePwmWrite(0, 0);
    } else {
      pwmBuzzer.hardwarePwmWrite(
        frequency,
        1000000 * Math.min(Math.max(level, 0), 1)
      );
    }
    setTimeout(() => pwmBuzzer.hardwarePwmWrite(frequency, 0), durationMS);
  }
};
