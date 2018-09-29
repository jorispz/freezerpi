import { Gpio } from "pigpio";
import { Buzzer } from "..";

const pwmBuzzer = new Gpio(18, {
  mode: Gpio.OUTPUT
});

export const buzzer: Buzzer = {
  buzz(level: number, frequency: number) {
    if (frequency === 0 || level === 0) {
      pwmBuzzer.hardwarePwmWrite(440, 0);
    } else {
      pwmBuzzer.hardwarePwmWrite(Math.round(frequency), Math.round(1000000 * Math.min(Math.max(level, 0), 1)));
    }
  }
};
