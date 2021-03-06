import { DoorSensor, Buzzer, FreezerIO } from "..";
import WebSocket from "ws";
import { logger } from "../../logger";

export type DoorCallback = (isOpen: boolean) => void;

let callbacks: DoorCallback[] = [];

const mockSensor: DoorSensor = {
  onChange(cb: DoorCallback) {
    callbacks.push(cb);
  }
};

const mockBuzzer: Buzzer = {
  buzz(level: number, frequency: number) {
    logger.info(`BUZZ(${level}, ${frequency})`);
  }
};

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    const action: { isOpen: boolean } = JSON.parse(message.toString());
    callbacks.forEach(cb => cb(action.isOpen));
  });
});

export const io: FreezerIO = {
  buzzer: mockBuzzer,
  doorSensor: mockSensor
};
