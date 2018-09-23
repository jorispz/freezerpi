import { DoorSensor, Buzzer, FreezerIO } from "..";

const mockSensor: DoorSensor = {
  onChange(callback: (isOpen: boolean) => void) {
    console.log("Registered callback ");
  }
};

const mockBuzzer: Buzzer = {
  buzz(level: number, durationMS: number) {
    console.log(`BUZZ(${level}, ${durationMS})`);
  }
};

export const io: FreezerIO = {
  buzzer: mockBuzzer,
  doorSensor: mockSensor
};
